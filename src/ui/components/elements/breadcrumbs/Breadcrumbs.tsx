import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import classes from './Breadcrumbs.module.scss';

type TBreadcrumbsProps = {
  path: Array<{
    title: string;
    url?: string;
  }>;
  className?: string;
  activeClassName?: string;
};

export const Breadcrumbs: FC<TBreadcrumbsProps> = ({ path, className, activeClassName }) => {
  const getBreadcrumbs = () => {
    const last = path.length - 1;
    return path.map((step, i) => (
      <>
        {i !== last && step.url ? (
          <NavLink to={step.url} className={className}>
            {step.title}
          </NavLink>
        ) : (
          <span className={`${className} ${activeClassName}`}>{step.title}</span>
        )}
        {i !== last && <>&ensp;/&ensp;</>}
      </>
    ));
  };
  return <div className={`${classes.container} ${className}`}>{getBreadcrumbs()}</div>;
};
