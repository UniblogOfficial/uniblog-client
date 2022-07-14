import React, { MouseEvent, useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';

import { getAllMultilinks, setMLDraft } from '../../../../bll/reducers';
import { ID, MLContentType } from '../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { TMLSavedDraft } from '../../../../common/types/instance/mlDraft';
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
  MLWidget,
} from '../../../components/modules/mlBlocks';

import { drafts } from './editor/template/drafts';

const MultilinkDraftContainer = () => {
  const dispatch = useAppDispatch();
  const [isDraft, setIsDraft] = useState(false);
  if (isDraft) {
    return <Redirect to="/multilink/new" />;
  }

  const onCLickHandler = (draft: TMLSavedDraft) => {
    dispatch(setMLDraft(draft));
    setIsDraft(true);
  };
  const mappedMLs = drafts.map((draft, i) => (
    <div key={ID[i]} className="grid__row row-3">
      <input
        type="button"
        className="full-absolute"
        value={draft.name}
        onClick={() => onCLickHandler(draft)}
      />
      <ul key={ID[i]} className="ml-preview">
        {draft.blocks.map((block, j) => {
          switch (block.type) {
            case MLContentType.TEXT:
              return <MLText key={ID[j]} id="" block={block} />;

            case MLContentType.SOCIAL:
              return <MLSocial key={ID[j]} id="" block={block} />;

            // case MLContentType.WIDGET:
            //   return block && <MLWidget key={ID[j]} id="" block={block} />;

            case MLContentType.VIDEO:
              return <MLVideo key={ID[j]} id="" block={block} />;

            /* case MLContentType.AUDIO:
              return block && <>audio block</>; */

            // case MLContentType.VOTE:
            //   return block && <MLVote key={ID[j]} id="" block={block} />;

            case MLContentType.LOGO:
              return block && <MLLogo key={ID[j]} id="" block={block} images={null} />;

            case MLContentType.LINK:
              return <MLLink key={ID[j]} id="" block={block} image={null} />;

            // case MLContentType.BUTTON:
            //   return <MLButton key={ID[j]} id="" block={block} />;

            case MLContentType.IMAGE:
              return <MLImage key={ID[j]} id="" block={block} image={null} />;

            // case MLContentType.IMAGETEXT:
            //   return <MLImageText key={ID[j]} id="" block={block} image={null} />;

            case MLContentType.SHOP:
              return <MLShop key={ID[j]} id="" block={block} images={null} />;
            default:
              return <li key={ID[j]} />;
          }
        })}
      </ul>
    </div>
  ));
  return <div>{mappedMLs}</div>;
};

export default MultilinkDraftContainer;
