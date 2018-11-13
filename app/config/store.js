import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduces from '../reducers';

const middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
export default createStore(reduces, applyMiddleware(...middleware));
