/* eslint-disable no-unused-vars */
import { mockData } from '../data/mockData';

export default function ExchangeMoneyService(axiosInstance) {
  async function getExchangeInfo() {
    try {
      const result = await axiosInstance.get('MOCK_URL');
      return mockData;
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getExchangeInfo,
  };
}
