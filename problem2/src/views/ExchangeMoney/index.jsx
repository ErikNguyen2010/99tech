import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import baseApi from '../../services/baseService';
import ExchangeMoneyService from '../../services/ExchangeMoneyService';
import { uniqBy } from 'lodash';
import ExchangeDetail from './ExchangeDetail';

const defaultFormData = {
  fromAmount: '1',
  fromCurrency: 'USD',
  toAmount: '1',
  toCurrency: 'USD',
};
const ExchangeMoney = () => {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [exchangeData, setExchangeData] = useState([]);
  const [isDisableSelectCurrency, setIsDisableSelectCurrency] = useState({
    fromCurrency: true,
    toCurrency: false,
  });
  const [exchangeInfo, setExchangeInfo] = useState({});

  const api = ExchangeMoneyService(baseApi);
  const validationSchema = yup.object({});

  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: defaultFormData,
    // validationSchema: validationSchema,
    // validateOnChange: validateAfterSubmit,
    // validateOnBlur: validateAfterSubmit,
    onSubmit: () => {
      if (isDisableSelectCurrency.fromCurrency) {
        const foundCurrency = exchangeData.find(
          (item) => item.currency === values.toCurrency
        );
        setValues((prev) => ({
          ...prev,
          toAmount: +values.fromAmount * foundCurrency.price,
        }));

        setExchangeInfo({
          fromAmount: 1 / foundCurrency.price,
          fromCurrency: values.fromCurrency,
          toAmount: foundCurrency.price,
          toCurrency: values.toCurrency,
        });
      } else {
        const foundCurrency = exchangeData.find(
          (item) => item.currency === values.fromCurrency
        );
        setValues((prev) => ({
          ...prev,
          fromAmount: +values.toAmount / foundCurrency.price,
        }));

        setExchangeInfo({
          fromAmount: foundCurrency.price,
          fromCurrency: values.fromCurrency,
          toAmount: 1 / foundCurrency.price,
          toCurrency: values.toCurrency,
        });
      }
    },
  });

  const handleSwapCurrency = () => {
    setIsDisableSelectCurrency({
      fromCurrency: !isDisableSelectCurrency.fromCurrency,
      toCurrency: !isDisableSelectCurrency.toCurrency,
    });

    if (values.fromCurrency === 'USD') {
      const foundCurrency = exchangeData.find(
        (item) => item.currency === values.toCurrency
      );
      setValues({
        fromAmount: +values.fromAmount,
        fromCurrency: values.toCurrency,
        toAmount: +values.fromAmount / foundCurrency.price,
        toCurrency: values.fromCurrency,
      });

      setExchangeInfo({
        fromAmount: foundCurrency.price,
        fromCurrency: values.toCurrency,
        toAmount: 1 / foundCurrency.price,
        toCurrency: values.fromCurrency,
      });
    } else {
      const foundCurrency = exchangeData.find(
        (item) => item.currency === values.fromCurrency
      );

      setValues({
        fromAmount: values.fromAmount,
        fromCurrency: values.toCurrency,
        toAmount: foundCurrency.price * +values.fromAmount,
        toCurrency: values.fromCurrency,
      });

      setExchangeInfo({
        fromAmount: 1 / foundCurrency.price,
        fromCurrency: values.toCurrency,
        toAmount: foundCurrency.price,
        toCurrency: values.fromCurrency,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const res = await api.getExchangeInfo();
      const uniqArr = uniqBy(res, 'currency');
      const temp = uniqArr.map((item) => ({
        value: item.currency,
        label: item.currency,
      }));
      setCurrencyOption(temp);
      setExchangeData(uniqArr);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h5>Swap</h5>
      <label for='input-amount'>
        <InputField
          inputId={'fromAmount'}
          inputName={'fromAmount'}
          inputValue={values.fromAmount}
          onChangeInput={handleChange}
          selectId={'fromCurrency'}
          selectName={'fromCurrency'}
          selectValue={values.fromCurrency}
          onChangeSelect={handleChange}
          currencyOption={currencyOption}
          isDisableInput={isDisableSelectCurrency.toCurrency}
          isDisableSelect={isDisableSelectCurrency.fromCurrency}
        />
      </label>

      <label for='output-amount'>
        <InputField
          inputId={'toAmount'}
          inputName={'toAmount'}
          inputValue={values.toAmount}
          onChangeInput={handleChange}
          selectId={'toCurrency'}
          selectName={'toCurrency'}
          selectValue={values.toCurrency}
          onChangeSelect={handleChange}
          currencyOption={currencyOption}
          isDisableInput={isDisableSelectCurrency.fromCurrency}
          isDisableSelect={isDisableSelectCurrency.toCurrency}
        />
      </label>

      <button type='submit'>CONFIRM</button>
      <button type='button' onClick={handleSwapCurrency}>
        swap curency
      </button>
      <ExchangeDetail exchangeInfo={exchangeInfo} data={values} />
    </form>
  );
};

export default ExchangeMoney;
