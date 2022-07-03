import React, { useCallback } from 'react';

import { AudioField } from '../../../../../../components/modules/audioField/AudioField';

import { setMLDraftBlockContentImage } from 'bll/reducers';
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

  return (
    <div className="ml-image-editor">
      <div style={{ position: 'relative', height: '150px' }}>
        <AudioField onChange={onDropZoneChange} />
      </div>
      <ul>{fields}</ul>
      <Button>Add music</Button>
    </div>
  );
};
