import {
  SUBMIT_WALLET_INFO,
  // SEARCH_BEGIN,
  SEARCH_SUCCESS,
  // SEARCH_ERROR,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  totalExpenses: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_WALLET_INFO:
    return {
      ...state,
      ...action.payload,
    };
  case SEARCH_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.apiobj,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      isLoading: false,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload.state,
          exchangeRates: action.payload.data,
        },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  default: return state;
  }
};

export default walletReducer;
