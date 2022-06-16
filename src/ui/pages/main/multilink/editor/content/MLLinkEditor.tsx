import React, { useState, MouseEvent } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { IMLDraftLink, IMLDraftText } from '../../../../../../common/types/instance';

import { MLContentType, SocialNetwork } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { Button, Input } from 'ui/components/elements';

type TLinkFormData = {
  title: string;
  link: string;
};

type TMLLinkEditorProps = {
  order: number;
  close: (e: MouseEvent<HTMLButtonElement>) => void;
  block?: IMLDraftLink;
};

const MAX_SYMBOLS_TITLE = 24;

const linkSchema = yup.object().shape({
  title: yup
    .string()
    .required('Link title is required')
    .max(MAX_SYMBOLS_TITLE, `Title cannot be more than ${MAX_SYMBOLS_TITLE} symbols`),
  link: yup
    .string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      'Invalid url',
    )
    .required('Url is required'),
});

export const MLLinkEditor = ({ order, close }: TMLLinkEditorProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
    reset,
    clearErrors,
  } = useForm<TLinkFormData>({
    mode: 'onChange', // important for dynamical tips
    resolver: yupResolver(linkSchema, { abortEarly: false }),
    criteriaMode: 'all', // important for dynamical tips
  });
  const initialHelperState = {
    title: true,
    link: true,
  };
  const [helperState, setHelperState] = useState(initialHelperState);
  const onFieldFocusChange = (name: keyof TLinkFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
  };
  const onSubmit: SubmitHandler<TLinkFormData> = (data, e) => {
    console.log(e);
    /* dispatch(
      setMLDraftContent({
        order,
        type: MLContentType.LINK,
        isFilled: true,
        link: data.link,
        linkType: 'third-party',
        title: data.title,
        text: null,
        img: null,
      }),
    ); */
  };

  return (
    <form className="template__ml-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="field">
        <div className="field__input">
          <Input
            {...register('title', { value: '' })}
            type="text"
            name="title"
            placeholder="Enter link title"
            onChangeFocus={state => {
              onFieldFocusChange('title', state);
            }}
          />
        </div>
        <div className="field__error">
          {helperState.title &&
            dirtyFields.title &&
            errors.title &&
            // order of OR statement is important! other errors used for dynamic tips
            errors.title.message}
        </div>
      </section>
      <section className="field">
        <div className="field__input">
          <Input
            {...register('link', { value: '' })}
            type="text"
            name="link"
            placeholder="Enter link url"
            onChangeFocus={state => {
              onFieldFocusChange('link', state);
            }}
          />
        </div>
        <div className="field__error">
          {helperState.link &&
            dirtyFields.link &&
            errors.link &&
            // order of OR statement is important! other errors used for dynamic tips
            errors.link.message}
        </div>
      </section>
      <div>
        <Button data-value="-1" type="submit" onClick={close} className="button _full _rounded">
          {t('common:buttons.ok')}
        </Button>
      </div>
    </form>
  );
};
