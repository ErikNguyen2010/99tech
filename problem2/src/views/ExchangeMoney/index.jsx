import { useEffect, useState } from 'react';
import * as yup from 'yup';
import InputField from '@/components/InputField';
import { useFormik } from 'formik';
import baseApi from '@/services/baseService';
import ExchangeMoneyService from '@/services/ExchangeMoneyService';
import { uniqBy } from 'lodash';
import ExchangeDetail from './ExchangeDetail';
import { Button, Grid2, IconButton } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import './styles.scss';

const defaultFormData = {
  fromAmount: '1',
  fromCurrency: 'USD',
  toAmount: '1',
  toCurrency: 'USD',
};
const ExchangeMoney = () => {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [exchangeData, setExchangeData] = useState([]);
  const [exchangeInfo, setExchangeInfo] = useState({});
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const api = ExchangeMoneyService(baseApi);
  const validationSchema = yup.object({});

  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: defaultFormData,
    // validationSchema: validationSchema,
    // validateOnChange: validateAfterSubmit,
    // validateOnBlur: validateAfterSubmit,
    onSubmit: async () => {
      setIsLoading(true);
      const payload = {
        currencyFrom: values.fromCurrency,
        currencyTo: values.toCurrency,
        amount: values.fromAmount,
      };

      const result = await api.exchangeMoney(payload);

      setValues((prev) => ({
        ...prev,
        toAmount: result.calculateAmount,
      }));

      setExchangeInfo({
        fromAmount: values.fromAmount / result.calculateAmount,
        fromCurrency: values.fromCurrency,
        toAmount: result.calculateAmount / values.fromAmount,
        toCurrency: values.toCurrency,
      });
      setIsLoading(false);
    },
  });

  const handleSwapCurrency = async () => {
    setIsLoading(true);
    const payload = {
      currencyFrom: values.toCurrency,
      currencyTo: values.fromCurrency,
      amount: values.fromAmount,
    };

    const result = await api.exchangeMoney(payload);

    setValues({
      fromAmount: +values.fromAmount,
      fromCurrency: values.toCurrency,
      toAmount: result.calculateAmount,
      toCurrency: values.fromCurrency,
    });

    const isFromInput = count % 2 !== 0;

    if (isFromInput) {
      const foundCurrency = exchangeData.find(
        (item) => item.currency === values.toCurrency
      );
      setExchangeInfo({
        fromAmount: 1 / foundCurrency.price,
        fromCurrency: values.toCurrency,
        toAmount: foundCurrency.price,
        toCurrency: values.fromCurrency,
      });
    } else {
      const foundCurrency = exchangeData.find(
        (item) => item.currency === values.fromCurrency
      );
      setExchangeInfo({
        fromAmount: foundCurrency.price,
        fromCurrency: values.toCurrency,
        toAmount: 1 / foundCurrency.price,
        toCurrency: values.fromCurrency,
      });
    }

    setCount((prev) => prev + 1);
    setIsLoading(false);
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
    <div className='form-background'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h5 className='form-title'>Exchange Token</h5>
          <Grid2 alignItems='center' justifyContent='center' container>
            <Grid2 size={{ xs: 5.5, md: 5.5 }}>
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
                isDisableInput={isLoading}
                isDisableSelect={isLoading}
              />
            </Grid2>
            <Grid2 size={{ xs: 1, md: 1 }}>
              <IconButton
                disabled={isLoading}
                onClick={handleSwapCurrency}
                className='form-icon-button'
                aria-label='delete'
                size='large'
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: '3rem',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                color='primary'>
                <SwapHorizIcon />
              </IconButton>
            </Grid2>
            <Grid2 size={{ xs: 5.5, md: 5.5 }}>
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
                isDisableInput={true}
                isDisableSelect={isLoading}
              />
            </Grid2>
          </Grid2>

          <Grid2 pt={3} container>
            <Grid2 size={{ xs: 5.5, md: 4 }} pl={7}>
              <ExchangeDetail exchangeInfo={exchangeInfo} data={values} />
            </Grid2>
            <Grid2 size={{ xs: 5.5, md: 4 }}>
              <Button
                loading={isLoading}
                loadingPosition='start'
                type='submit'
                variant='contained'
                disabled={isLoading}
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  '&:focus': {
                    outline: 'none',
                  },
                }}>
                Confirm
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 5.5, md: 4 }}></Grid2>
          </Grid2>
        </form>
      </div>
    </div>
  );
};

export default ExchangeMoney;
