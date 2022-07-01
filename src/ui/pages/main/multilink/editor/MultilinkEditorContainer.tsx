import React, { useMemo, useState, MouseEvent, useCallback, FC } from 'react';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { MLBackground } from './background/MLBackground';
import { MLContent } from './content/MLContent';
import { MLPreview } from './preview/MLPreview';
import { MLTemplate } from './template/MLTemplate';
import { MLTemplates } from './template/MLTemplates';

import { publishMultilink, setDragBlock } from 'bll/reducers';
import { ID, MLContentType } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  MLDraftAudio,
  MLDraftButton,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftShop,
  MLDraftSocial,
  MLDraftText,
  MLDraftVideo,
  MLDraftVote,
  MLDraftWidget,
  Nullable,
  TMLDraftBlocksUnion,
  TMultilinkDraft,
  TUser,
} from 'common/types/instance';
import { Button } from 'ui/components/elements';
import { WrapperDrag } from 'ui/components/modules/DragWrapper/DragWrapper';
import {
  MLButton,
  MLImage,
  MLImageText,
  MLLink,
  MLLogo,
  MLShop,
  MLSocial,
  MLText,
  MLVideo,
  MLVote,
} from 'ui/components/modules/mlBlocks';
import { MLMap } from 'ui/components/modules/mlBlocks/mlMap/MLMap';
import { MLWidget } from 'ui/components/modules/mlBlocks/mlWidget/MLWidget';

type TMultilinkEditorContainerProps = {
  userData: TUser;
};

enum EditorStage {
  TEMPLATE = 0,
  BACKGROUND = 1,
  CONTENT = 2,
  PREVIEW = 3,
}

const voidOrder = '-1';

export const MultilinkEditorContainer: FC<TMultilinkEditorContainerProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [stage, setStage] = useState<EditorStage>(0);
  const [blockEditorType, setBlockEditorType] = useState<Nullable<MLContentType>>(null);
  const [blockEditorId, setBlockEditorId] = useState(voidOrder);
  const [currentMLTemplate, setCurrentMLTemplate] = useState(0);
  const { name, background, maxWidth, contentMap, blocks, images } =
    useAppSelector<TMultilinkDraft>(state => state.mlDraft);
  const stageTitles = useMemo(
    () => [
      t('pages:multilink.creation.stages.template'),
      t('pages:multilink.creation.stages.background'),
      t('pages:multilink.creation.stages.content'),
      t('pages:multilink.creation.stages.preview'),
    ],
    [t],
  );

  const setBlockEditor = (payload: { type: MLContentType; id: string } | null) => {
    if (payload) {
      setBlockEditorType(payload.type);
      setBlockEditorId(payload.id);
    } else {
      setBlockEditorType(null);
      setBlockEditorId(voidOrder);
    }
  };

  const onPublishButtonClick = () => {
    if (contentMap) {
      dispatch(publishMultilink({ name, background, maxWidth, contentMap, blocks, images }));
    }
  };

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (Number(e.currentTarget.value) > 0) {
      stage < 3 && setStage(stage + Number(e.currentTarget.value)); // to next stage
    }
    if (Number(e.currentTarget.value) < 0) {
      stage > 0 && setStage(stage + Number(e.currentTarget.value)); // to previous stage
    }
  };

  const getLayout = useCallback(
    (editable: boolean, limited: boolean) => {
      const templateClassName = limited ? 'ml-template' : 'ml-template ml-template_unlimited';
      const templateBackground = images.background
        ? `url(${images.background.previewUrl})`
        : background;

      const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
          return;
        }

        dispatch(setDragBlock({ destinationIndex: destination.index, sourceIndex: source.index }));
      };

      return (
        <DragDropContext enableDefaultSensors onDragEnd={onDragEnd}>
          <Droppable droppableId="MLList">
            {(provided, snapshot) => (
              <div
                className={`${snapshot.isDraggingOver ? 'dragactive' : ''} ${templateClassName}`}
                style={{ background: templateBackground }}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {contentMap.map((contentId, i) => {
                  const [type, id] = contentId.split('_') as [MLContentType, string];
                  const block: TMLDraftBlocksUnion = blocks[contentId];
                  let image;
                  const callback = editable
                    ? () =>
                        setBlockEditor({
                          type,
                          id,
                        })
                    : undefined;
                  if (block instanceof MLDraftText) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLText id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftSocial) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLSocial id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftWidget) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLWidget id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftVideo) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLVideo id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftMap) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLMap id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftAudio) {
                    return <>audio block</>;
                  }
                  if (block instanceof MLDraftVote) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLVote id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftLogo) {
                    image = images.blocks[MLContentType.LOGO][i];
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLLogo id={id} block={block} images={image} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftLink) {
                    image = images.blocks[MLContentType.LINK][i];
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLLink key={id} id={id} block={block} image={image} callback={callback} />
                      </WrapperDrag>
                    );
                  }

                  if (block instanceof MLDraftButton) {
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLButton id={id} block={block} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftImage) {
                    image = images.blocks[MLContentType.IMAGE][i];
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLImage id={id} block={block} image={image} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftImageText) {
                    image = images.blocks[MLContentType.IMAGETEXT][i];
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLImageText id={id} block={block} image={image} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  if (block instanceof MLDraftShop) {
                    image = images.blocks[MLContentType.SHOP][i];
                    return (
                      <WrapperDrag key={id} id={id} index={i}>
                        <MLShop id={id} block={block} images={image} callback={callback} />
                      </WrapperDrag>
                    );
                  }
                  return <li key={ID[i]} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    },
    [contentMap, blocks, background, images.blocks, images.background],
  );
  return (
    <>
      <div className="grid__row multilink-editor__nav paper">
        <div className="button">
          {stage > 0 && (
            <Button onClick={onNextButtonClick} value="-1" className="button _rounded">
              {t('common:buttons.back')}
            </Button>
          )}
        </div>
        <h3 className="paper-title">{stageTitles[stage]}</h3>
        <div className="button _right">
          <Button onClick={onNextButtonClick} value="1" className="button _rounded">
            {t('common:buttons.next')}
          </Button>
        </div>
      </div>
      <div
        className="grid__row paper"
        style={stage === EditorStage.PREVIEW ? { justifyContent: 'center' } : undefined}>
        <div className="multilink-editor">
          <section className="ml-creation-area">
            {stage === EditorStage.TEMPLATE && (
              <MLTemplate userData={userData} currentMLTemplate={currentMLTemplate} />
            )}
            {stage === EditorStage.BACKGROUND && (
              <div className="multilink-editor__constructor">{getLayout(false, false)}</div>
            )}
            {stage === EditorStage.CONTENT && (
              <div className="multilink-editor__constructor">{getLayout(true, false)}</div>
            )}
            {stage === EditorStage.PREVIEW && (
              <div className="multilink-editor__constructor">{getLayout(false, true)}</div>
            )}
          </section>
          <section className="tools-area">
            <div className="tools-area__container">
              {stage === EditorStage.TEMPLATE && (
                <MLTemplates userData={userData} setCurrentMLTemplate={setCurrentMLTemplate} />
              )}
              {stage === EditorStage.BACKGROUND && <MLBackground />}
              {stage === EditorStage.CONTENT && (
                <MLContent
                  contentMap={contentMap}
                  blocks={blocks}
                  images={images}
                  blockEditorType={blockEditorType}
                  blockEditorId={blockEditorId}
                  setBlockEditor={setBlockEditor}
                />
              )}
              {stage === EditorStage.PREVIEW && <MLPreview name={name} username={userData.name} />}
              {stage === EditorStage.PREVIEW && (
                <div className="action-buttons">
                  <Button onClick={onPublishButtonClick} className="button _rounded">
                    {t('common:buttons.ok')}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
