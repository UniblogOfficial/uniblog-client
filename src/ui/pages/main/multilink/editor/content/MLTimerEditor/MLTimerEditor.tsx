import React, { useState } from 'react';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { MLContentType } from '../../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { IMLDraftTimer, Nullable } from '../../../../../../../common/types/instance';
import { Button, Input } from '../../../../../../components/elements';

type TMLImageEditorProps = {
  id: string;
  block: Nullable<IMLDraftTimer>;
};

export const MlTimerEditor = ({ id, block }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const deadline = new Date(`${data}T${time}`);
  const diff = +deadline - +new Date();
  console.log(`diff${diff}`);
  const setTimerHandler = () => {
    dispatch(
      setMLDraftBlockContent({ content: { countdown: diff }, id, type: MLContentType.TIMER }),
    );
  };
  return (
    <div>
      <div>
        <Input type="date" onChangeText={setData} /> Введите дату
      </div>
      <div>
        <Input type="time" onChangeText={setTime} /> Введите время
      </div>
      <Button onClick={setTimerHandler}>add Timer</Button>
    </div>
  );
};
