import React from 'react';

import sber from '../../../img/sber-online.png';

type TPurchaseContainerProps = {};

export const PurchaseContainer = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <p style={{ padding: '20px 100px 80px', textAlign: 'center', fontSize: '20px' }}>
      Привет! Нажми “Купить”, чтобы купить данный курс, как только ты пройдёшь онлайн оплату, то
      появится сообщение с ссылкой на группу ВК, куда нужно отправить запрос на вступление
    </p>
    <div style={{ position: 'relative', width: '441px', height: '106px' }}>
      <img src={sber} alt="sber-online" />
    </div>
  </div>
);
