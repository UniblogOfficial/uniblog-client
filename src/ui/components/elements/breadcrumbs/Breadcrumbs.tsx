import React, { FC } from 'react';

import classes from './Breadcrumbs.module.scss';

type TBreadcrumbsProps = {
  path: Array<string>;
  className?: string;
};

export const Breadcrumbs: FC<TBreadcrumbsProps> = ({ path, className }) => {
  const breadcrumbs = path.map((step, i) => (
    <>
      <a className={className}>{step}</a>
      {i !== path.length - 1 && <>&ensp;/&ensp;</>}
    </>
  ));
  return <div className={classes.container}>{breadcrumbs}</div>;
};
