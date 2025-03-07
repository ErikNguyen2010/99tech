import React from 'react';
import './styles.scss';

function ExchangeDetail({ exchangeInfo }) {
  const renderUI = () => {
    return (
      exchangeInfo.toCurrency !== exchangeInfo.fromCurrency && (
        <div>
          <div className='exchange-detail'>
            1 {exchangeInfo?.fromCurrency} = {exchangeInfo.toAmount.toFixed(10)}
            {''} {exchangeInfo?.toCurrency}
          </div>
          <div className='exchange-detail'>
            1 {exchangeInfo?.toCurrency} = {exchangeInfo.fromAmount.toFixed(10)}
            {''} {exchangeInfo?.fromCurrency}
          </div>
        </div>
      )
    );
  };

  return renderUI();
}

export default ExchangeDetail;
