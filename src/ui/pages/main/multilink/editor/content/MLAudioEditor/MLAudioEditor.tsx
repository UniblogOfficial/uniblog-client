import React, { ChangeEvent, useCallback, useState } from 'react';

import { MLContentType } from '../../../../../../../common/constants';
import { AudioField } from '../../../../../../components/modules/audioField/AudioField';

import { setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftAudio, Nullable, TImageFile } from 'common/types/instance';
import { Button } from 'ui/components/elements';

type TMLImageEditorProps = {
  id: string;
  block: Nullable<IMLDraftAudio>;
};

export const MLAudioEditor = ({ id, block }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const copyBlock = { ...block };
  const [showInputForUrl, setShowInputForUrl] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      dispatch(
        setMLDraftBlockContentImage({
          imageData: { image: imageFile },
          id,
          field: 'audioBlocks',
        }),
      );
    },
    [dispatch],
  );
  if (!copyBlock) return <p>Error: Block not found</p>;
  const fields = copyBlock.url && (
    <div style={{ position: 'relative', height: '150px' }}>
      <AudioField onChange={onDropZoneChange} />
    </div>
  );
  const showInputForUrlAudio = () => {
    setShowInputForUrl(true);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.currentTarget.value);
  };
  const setUrlAudioFile = () => {
    setShowInputForUrl(false);
    dispatch(setMLDraftBlockContent({ content: { url: audioUrl }, id, type: MLContentType.AUDIO }));
  };
  return (
    <div className="ml-image-editor">
      <div style={{ position: 'relative', height: '150px' }}>
        <AudioField onChange={onDropZoneChange} />
      </div>
      <ul>{fields}</ul>
      {showInputForUrl ? (
        <div>
          <input
            style={{ width: '100%', height: '50px', backgroundColor: 'red' }}
            placeholder="Please, enter audio url"
            onChange={onChangeHandler}
          />
          <Button onClick={setUrlAudioFile}>Send track</Button>
        </div>
      ) : (
        <Button onClick={showInputForUrlAudio}>Add music or url</Button>
      )}
    </div>
  );
};
