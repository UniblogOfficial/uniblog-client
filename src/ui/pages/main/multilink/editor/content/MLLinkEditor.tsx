import React, { MouseEvent, useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AllSavedImages from '../../../../../components/modules/allSavedImages/AllSavedImages';

import { saveImage, setMLDraftBlockContent } from 'bll/reducers';
import { MLAllSavedImagesType, MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftLink, Nullable, TImageFile, TMLImageContentLink } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TLinkFormData = {
  title: string;
  link: string;
};

type TMLLinkEditorProps = {
  id: string;
  close?: (e: MouseEvent<HTMLButtonElement>) => void;
  block: IMLDraftLink;
  image: Nullable<TMLImageContentLink<TImageFile>>;
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

export const MLLinkEditor = ({ id, close, image, block }: TMLLinkEditorProps) => {
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
  const [titleCharacters, setTitleCharacters] = useState(block?.title ?? '');
  const onFieldFocusChange = (name: keyof TLinkFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
  };
  useEffect(() => {
    if (titleCharacters.length <= 24) {
      dispatch(
        setMLDraftBlockContent({
          content: { title: titleCharacters },
          id,
          type: MLContentType.LINK,
        }),
      );
    }
  }, [titleCharacters]);
  const onSubmit: SubmitHandler<TLinkFormData> = (data, e) => {
    console.log(e);
    dispatch(
      setMLDraftBlockContent({
        type: MLContentType.LINK,
        id,
        content: { title: data.title, href: data.link },
      }),
    );
  };
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      imageFile.name = 'link-0-1';
      dispatch(saveImage({ imageData: { image: imageFile }, id, type: MLContentType.LINK }));
    },
    [dispatch, image],
  );
  return (
    <form className="template__ml-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="field">
        <div className="field__input">
          <Input
            {...register('title', { value: block?.title ?? '' })}
            type="text"
            name="title"
            placeholder="Enter link title"
            onChangeText={setTitleCharacters}
            onChangeFocus={state => {
              onFieldFocusChange('title', state);
            }}
          />
          <span style={{ marginLeft: '90px' }}>{MAX_SYMBOLS_TITLE - titleCharacters.length}</span>
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
            {...register('link', { value: block.href ?? '' })}
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
      <div style={{ position: 'relative', height: '150px' }}>
        <ImageField onChange={onDropZoneChange} mode="square" />
      </div>
      <div>
        <Button data-value="-1" type="submit" className="button _full _rounded">
          {t('common:buttons.ok')}
        </Button>
        <AllSavedImages
          id={id}
          imagesType={MLAllSavedImagesType.IMAGES_LINK}
          contentType={MLContentType.LINK}
        />
      </div>
    </form>
  );
};
