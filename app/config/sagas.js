import {
  takeEvery, select, call, put,
} from 'redux-saga/effects';

import {
  SWAP_CURRENCIES,
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_ERROR,
  CONVERSION_RESULT,
} from '../actions/currencies';

const getLatestRate = currency => fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`);

function* fetchLtestConversionRates(action) {
  try {
    let { currency } = action;
    if (currency === undefined) {
      currency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRate, currency);
    const result = response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    yield put({ type: CONVERSION_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLtestConversionRates);
  yield takeEvery(GET_INITIAL_CONVERSION, SWAP_CURRENCIES);
  yield takeEvery(GET_INITIAL_CONVERSION, CHANGE_BASE_CURRENCY);
}
