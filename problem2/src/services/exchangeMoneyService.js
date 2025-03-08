/* eslint-disable no-unused-vars */
import { mockData } from '../data/mockData';

export default function ExchangeMoneyService(axiosInstance) {
  async function getExchangeInfo() {
    try {
      const result = await axiosInstance.get(
        'http://interview.switcheo.com/prices.json'
      );
      console.log(result);
      return mockData;
    } catch (err) {
      console.log(err);
    }
  }

  async function exchangeMoney(payload) {
    try {
      const result = await axiosInstance.post(
        'http://localhost:3000/calculate-swap-currency',
        payload
      );
      return result.data;
    } catch (err) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  return {
    getExchangeInfo,
    exchangeMoney,
  };
}
