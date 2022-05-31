import React from 'react';

import { useTranslation } from 'react-i18next';

import { Icon } from '../../../components/elements/icons/Icon';

export const XPublicationsContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div>
      <div>
        <h2>Today</h2>
        <Icon name="calendar" className="nav-icon" size="full" />
        <h2>monday</h2>
      </div>
    </div>
  );
};
