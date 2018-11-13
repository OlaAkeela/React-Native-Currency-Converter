export const SWAP_CURRENCIES = 'SWAP_CURRENCIES';
export const CHANGE_CURRENCY_AMOUNT = 'CHANGE_CURRENCY_AMOUNT';

export const swapCurrencies = () => ({
  type: SWAP_CURRENCIES,
});

export const changeCurrencyAmount = amount => ({
  type: CHANGE_CURRENCY_AMOUNT,
  amount: parseFloat(amount),
});
