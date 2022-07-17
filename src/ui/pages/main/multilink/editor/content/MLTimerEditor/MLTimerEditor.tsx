import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { saveImage, setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftTimer, Nullable, TImageFile } from 'common/types/instance';
import { TMLImageContentTimer } from 'common/types/instance/mlDraft/mlDraft';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';
import { TimerField } from 'ui/components/modules/timerField/TimerField';

type TMLImageEditorProps = {
  id: string;
  block: Nullable<IMLDraftTimer>;
  image: Nullable<TMLImageContentTimer<TImageFile>>;
};

export const MlTimerEditor = ({ id, block, image }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);

  const [imageUrl, setImageUrl] = useState('');
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      dispatch(
        setMLDraftBlockContentImage({
          imageData: { image: imageFile },
          id,
          field: 'timerBlocks',
        }),
      );
    },
    [dispatch],
  );
  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const deadline = new Date(`${data}T${time}`);
  const diff = +deadline - +new Date();
  const setTimerHandler = () => {
    dispatch(
      setMLDraftBlockContent({ content: { countdown: diff }, id, type: MLContentType.TIMER }),
    );
  };
  const field = image && (
    <div style={{ position: 'relative', height: '150px' }}>
      <TimerField onChange={onDropZoneChange} />
    </div>
  );
  return (
    <div>
      <div style={{ position: 'relative', height: '150px' }}>{field}</div>
      <div>
        <Input type="date" onChangeText={setData} />{' '}
        {t('pages:multilink.creation.editors.timer.enterDate')}
      </div>
      <div>
        <Input type="time" onChangeText={setTime} />{' '}
        {t('pages:multilink.creation.editors.timer.enterTime')}
      </div>
      <Button onClick={setTimerHandler}>{t('pages:multilink.creation.editors.timer.run')}</Button>
    </div>
  );
};
