import React from 'react';

function ExchangeDetail({ exchangeInfo }) {
  const renderUI = () => {
    return (
      exchangeInfo.toCurrency !== exchangeInfo.fromCurrency && (
        <div>
          <div>
            1 {exchangeInfo?.fromCurrency} = {exchangeInfo.toAmount}
            {''} {exchangeInfo?.toCurrency}
          </div>
          <div>
            1 {exchangeInfo?.toCurrency} = {exchangeInfo.fromAmount}
            {''} {exchangeInfo?.fromCurrency}
          </div>
        </div>
      )
    );
  };

  return renderUI();
}

export default ExchangeDetail;
