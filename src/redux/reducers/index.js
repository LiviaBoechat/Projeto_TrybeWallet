import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import walletEdit from './walletEdit';

const rootReducer = combineReducers({
  user,
  wallet,
  walletEdit,
});

export default rootReducer;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
