import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { MLContentType, SocialNetwork } from '../../../../../../common/constants';
import { TMLDraftContent } from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';

type TLinkFormData = {
  title: string;
  link: string;
};

type TMLLinkFormProps = {
  order: number;
  setContent: (data: TMLDraftContent) => void;
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

export const MLLinkForm = ({ order, setContent }: TMLLinkFormProps) => {
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
  const onSubmit: SubmitHandler<TLinkFormData> = data => {
    console.log(setContent);
    return setContent({
      order,
      type: MLContentType.LINK,
      link: data.link,
      linkType: 'third-party',
      title: data.title,
      text: null,
      img: null,
    }); // 2
  };

  return (
    <div className="paper _with-button-bottom">
      <form className="" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
              (errors.title?.types?.required || errors.title?.types?.min)}
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
              (errors.link?.types?.required || errors.link?.types?.min)}
          </div>
        </section>
        <div className="paper__button-container">
          <Button value="1" type="submit" className="button _full _paper">
            {t('common:buttons.ok')}
          </Button>
        </div>
      </form>
    </div>
  );
};
