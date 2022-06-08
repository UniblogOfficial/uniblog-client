import { MLContentType, SocialNetwork } from 'common/constants';
import {
  IMLDraftLogo,
  IMLDraftText,
  IMLDraftLink,
  IMLDraftSocial,
  IMLDraftImageText,
  IMLDraftVideo,
  IMLDraftShop,
  IMLDraftImage,
  Nullable,
  TIncomingImage,
} from 'common/types/instance';
import { parseRawImage } from 'common/utils/ui';

export const getTemplates = (name: string, avatar: Nullable<TIncomingImage>) =>
  [
    [
      {
        order: 0,
        isFilled: !!avatar,
        logo: avatar ? parseRawImage(avatar) : '',
        size: 100,
        type: MLContentType.LOGO,
      } as IMLDraftLogo,
      {
        order: 1,
        isFilled: false,
        type: MLContentType.TEXT,
        text: name,
        fontSize: 22,
        fontWeight: 700,
        align: 'center',
        margin: [0, 0, 24],
        padding: [12, 24],
        background: '#0002',
      } as IMLDraftText,
      {
        order: 2,
        isFilled: false,
        type: MLContentType.SOCIAL,
        links: [
          'https://vk.com',
          'https://youtube.com',
          'https://instagram.com',
          'https://facebook.com/',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.INSTAGRAM,
          SocialNetwork.FACEBOOK,
        ],
        padding: [12, 24],
      } as IMLDraftSocial,
      {
        order: 3,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus! Doloremque, ut alias repellendus ducimus illum recusandae saepe possimus laboriosam accusamus rem debitis odit non a eveniet perferendis numquam sit labore nihil impedit. Eos dicta harum at libero dignissimos.',
        fontSize: 18,
        fontWeight: 400,
        margin: [0, 0, 24],
        padding: [0, 24],
      } as IMLDraftText,
      {
        order: 4,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 12],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
      {
        order: 5,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 12],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
      {
        order: 6,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 24],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
    ],
    [
      {
        order: 0,
        isFilled: false,
        logo: avatar ? parseRawImage(avatar) : '',
        size: 100,
        type: MLContentType.LOGO,
      } as IMLDraftLogo,
      {
        order: 1,
        isFilled: false,
        type: MLContentType.TEXT,
        text: name,
        fontSize: 22,
        fontWeight: 700,
        align: 'center',
        margin: [0, 0, 24],
        padding: [12, 24],
        background: '#0002',
      } as IMLDraftText,
      {
        order: 2,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus! Doloremque, ut alias repellendus ducimus illum recusandae saepe possimus laboriosam accusamus rem debitis odit non a eveniet perferendis numquam sit labore nihil impedit. Eos dicta harum at libero dignissimos.',
        fontSize: 18,
        fontWeight: 400,
        margin: [0, 0, 24],
        padding: [0, 24],
      } as IMLDraftText,
      {
        order: 3,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 12],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
      {
        order: 4,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 12],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
      {
        order: 5,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 24],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
      {
        order: 6,
        isFilled: false,
        type: MLContentType.SOCIAL,
        links: [
          'https://vk.com',
          'https://youtube.com',
          'https://instagram.com',
          'https://facebook.com/',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.INSTAGRAM,
          SocialNetwork.FACEBOOK,
        ],
        padding: [12, 24],
      } as IMLDraftSocial,
    ],
    [
      {
        order: 0,
        isFilled: false,
        logo: avatar ? parseRawImage(avatar) : '',
        size: 100,
        type: MLContentType.LOGO,
      } as IMLDraftLogo,
      {
        order: 1,
        isFilled: false,
        type: MLContentType.TEXT,
        text: name,
        fontSize: 22,
        fontWeight: 700,
        align: 'center',
        padding: [12, 24],
        background: '#0002',
      } as IMLDraftText,
      {
        order: 2,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Lorem ipsum, dolor sit amet.',
        fontSize: 18,
        fontWeight: 400,
        padding: [0, 24],
      } as IMLDraftText,
      {
        order: 3,
        isFilled: false,
        type: MLContentType.IMAGETEXT,
        image: null,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus!',
        imgPosition: 'left',
        vAlign: 'top',
        fontSize: 18,
        fontWeight: 400,
        padding: [0, 24],
      } as IMLDraftImageText,
      {
        order: 4,
        isFilled: false,
        type: MLContentType.IMAGETEXT,
        image: null,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus!',
        imgPosition: 'right',
        vAlign: 'top',
        fontSize: 18,
        fontWeight: 400,
        padding: [0, 24],
      } as IMLDraftImageText,
      {
        order: 5,
        isFilled: false,
        type: MLContentType.LINK,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24],
        margin: [0, 24, 12],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      } as IMLDraftLink,
      {
        order: 6,
        isFilled: false,
        type: MLContentType.SOCIAL,
        links: [
          'https://vk.com',
          'https://youtube.com',
          'https://instagram.com',
          'https://facebook.com/',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.INSTAGRAM,
          SocialNetwork.FACEBOOK,
        ],
        padding: [12, 24],
      } as IMLDraftSocial,
    ],
    [
      {
        order: 0,
        isFilled: !!avatar,
        logo: avatar ? parseRawImage(avatar) : '',
        size: 100,
        type: MLContentType.LOGO,
      } as IMLDraftLogo,
      {
        order: 1,
        isFilled: true,
        type: MLContentType.TEXT,
        text: 'Привет, меня зовут Евгений, и я готовлю к ЕГЭ и ОГЭ по математике более 10 лет \n\nСдал ЕГЭ на 100 баллов:\nhttps://vk.com/wall-40691695_66680',
        color: '#fff',
        fontSize: 14,
        fontWeight: 400,
        align: 'left',
        margin: [0, 0, 24],
        padding: [24, 24],
        background: '#85A4CC',
      } as IMLDraftText,
      {
        order: 2,
        isFilled: true,
        type: MLContentType.TEXT,
        text: 'ТОП БЕСПЛАТНЫХ КУРСОВ',
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
        align: 'left',
        padding: [12, 24],
        margin: [0, 0, 12],
        background: '#85A4CC',
      } as IMLDraftText,
      {
        order: 3,
        isFilled: true,
        type: MLContentType.VIDEO,
        url: 'https://www.youtube.com/embed/hYu0d-4SX_Y',
        margin: [0, 0, 24],
        padding: [0, 24],
      } as IMLDraftVideo,
      {
        order: 4,
        isFilled: true,
        type: MLContentType.TEXT,
        text: 'ТОП КУРСОВ',
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
        align: 'left',
        padding: [12, 24],
        margin: [0, 0, 12],
        background: '#85A4CC',
      } as IMLDraftText,
      {
        order: 5,
        isFilled: true,
        type: MLContentType.SHOP,
        grid: '1fr 1fr 1fr',
        gap: 5,
        cells: [
          {
            order: 0,
            image: null,
            background: '#fff',
            title: 'Курс "ВСПОМНИТЬ ВСЁ" 2022 (повторение всех заданий ЕГЭ)',
            subtitle: '2 490 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 1,
            image: null,
            background: '#fff',
            title: 'Видеокурс 1-11 задания ЕГЭ 2022 профиль (первая часть с нуля)',
            subtitle: '990 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 2,
            image: null,
            background: '#fff',
            title:
              'Видеокурс 12 задания ЕГЭ 2022 профиль (тригонометрия и другие типы 12-х с нуля)',
            subtitle: '790 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 3,
            image: null,
            background: '#fff',
            title: 'Видеокурс 13 задания ЕГЭ 2022 профиль (стереометрия с нуля)',
            subtitle: '790 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 4,
            image: null,
            background: '#fff',
            title: 'Видеокурс 10 задания ЕГЭ 2022 профиль (неравенства с нуля)',
            subtitle: '790 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 5,
            image: null,
            background: '#fff',
            title: 'Видеокурс 16 задания ЕГЭ 2022 профиль (планиметрия с нуля)',
            subtitle: '990 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 6,
            image: null,
            background: '#fff',
            title: 'Видеокурс 15 задания ЕГЭ 2022 профиль (кредиты и другие виды 15-х с нуля)',
            subtitle: '790 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
          {
            order: 7,
            image: null,
            background: '#fff',
            title: 'Видеокурс 17 задания ЕГЭ 2022 профиль (параметры с нуля)',
            subtitle: '990 ₽',
            href: `${process.env.REACT_APP_HOST_PRODUCTION}/purchase?t=wwcs9v`,
          },
        ],
        color: '#000',
        fontSize: 10,
        fontWeight: 400,
        align: 'left',
        subtitleColor: '#000',
        subtitleFontSize: 12,
        subtitleFontWeight: 700,
        subtitleAlign: 'center',
        margin: [0, 0, 24],
        padding: [12, 24],
      } as IMLDraftShop,
      {
        order: 6,
        isFilled: true,
        type: MLContentType.IMAGE,
        images: [null],
        margin: [0, 0, 24],
        padding: [12, 48],
      } as IMLDraftImage,
      {
        order: 7,
        isFilled: true,
        type: MLContentType.SOCIAL,
        links: [
          'https://vk.com/shkolapifagora',
          'https://www.youtube.com/channel/UC7Z3j8Cgsa2NnBmKAl7uOuQ',
          'https://instagram.com/shkola_pifagora',
        ],
        linkTypes: [SocialNetwork.VK, SocialNetwork.YOUTUBE, SocialNetwork.INSTAGRAM],
        margin: [0, 0, 24],
        padding: [12, 24],
      } as IMLDraftSocial,
    ],
    [
      {
        order: 0,
        isFilled: false,
        logo: avatar ? parseRawImage(avatar) : '',
        size: 143,
        type: MLContentType.LOGO,
        margin: [56, 116, 36],
      } as IMLDraftLogo,
      {
        order: 1,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Болею за «Арсенал» уже больше 20 лет. Пишу про свои мысли про клуб, и не только. Веду паблик в вк, знаю о новостях «Арсенала» практически все. ',
        fontSize: 22,
        fontWeight: 700,
        align: 'center',
        color: '#fff',
        margin: [0, 0, 60],
        padding: [0, 40],
      } as IMLDraftText,
      {
        order: 2,
        isFilled: false,
        type: MLContentType.SOCIAL,
        links: [
          'https://vk.com/arsscnews',
          'https://www.youtube.com/channel/UCBYo2XB0I9Q-EMdear8fD5w',
          'https://t.me/lexusarsenal',
          'https://www.arsenal.com/',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.TELEGRAM,
          SocialNetwork.INSTAGRAM,
        ],
        size: 65,
        margin: [0, 0, 60],
        padding: [12, 12],
      } as IMLDraftSocial,
      {
        order: 3,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Поддержка через Donation:',
        fontSize: 18,
        fontWeight: 400,
        align: 'center',
        color: '#fff',
        margin: [0, 0, 12],
        padding: [0, 24],
      } as IMLDraftText,
      {
        order: 4,
        isFilled: true,
        type: MLContentType.IMAGE,
        images: [null],
        margin: [0, 0, 6],
        padding: [0, 92],
      } as IMLDraftImage,
      {
        order: 5,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Donation Alerts',
        fontSize: 18,
        fontWeight: 400,
        align: 'center',
        color: '#fff',
        margin: [0, 0, 24],
        padding: [0, 24],
      } as IMLDraftText,
    ],
    [
      {
        order: 0,
        isFilled: !!avatar,
        logo: avatar ? parseRawImage(avatar) : '',
        size: 143,
        type: MLContentType.LOGO,
        margin: [56, 116, 56],
      } as IMLDraftLogo,
      {
        order: 1,
        isFilled: false,
        type: MLContentType.TEXT,
        text: 'Евгений',
        fontSize: 22,
        fontWeight: 700,
        align: 'center',
        color: '#fff',
        margin: [0, 0, 60],
        padding: [18, 40],
      } as IMLDraftText,
      {
        order: 2,
        isFilled: true,
        type: MLContentType.VIDEO,
        url: 'https://widget.qiwi.com/widgets/middle-widget-300x300?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPsXMCEHsEfvcM9fWDrHZGpWKAFeZPjiJbFtPjyxAanWqYMcU9DSN7wMpc8VGAVjmd9yjdSQRA92xGdkxFbtNyRSzFPrYeoktJhC8rNxvbe',
        margin: [0, 0, 24],
        padding: [0, 24],
      } as IMLDraftVideo,
      {
        order: 3,
        isFilled: false,
        type: MLContentType.SOCIAL,
        links: [
          'https://vk.com/kracko23',
          'https://discordapp.com/users/534986739513819138/',
          'https://tlgg.ru/Evgeny163',
          'https://msng.link/o/?krasikov.evgeny=ig',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.TELEGRAM,
          SocialNetwork.INSTAGRAM,
        ],
        size: 65,
        margin: [0, 0, 60],
        padding: [12, 12],
      } as IMLDraftSocial,
    ],
  ] as const;
