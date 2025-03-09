export default function ExchangeMoneyService(axiosInstance) {
  async function getExchangeInfo() {
    try {
      const result = await axiosInstance.get('/get-currency');
      return result.data;
    } catch (err) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  async function exchangeMoney(payload) {
    try {
      const result = await axiosInstance.post(
        '/calculate-swap-currency',
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
