export const SUBMIT_USER_INFO = 'SUBMIT_USER_INFO';
export const SUBMIT_WALLET_INFO = 'SUBMIT_WALLET_INFO';
export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SUBSCRIBE = 'SUBSCRIBE';
export const EDIT_TO_FALSE = 'EDIT_TO_FALSE';

export const submitUserInfo = (email) => ({
  type: SUBMIT_USER_INFO,
  payload: email,
});

export const submitWalletInfo = (payload) => ({
  type: SUBMIT_WALLET_INFO,
  payload,
});

// Ações para a Thunk Create Action

export const searchBegin = () => (
  { type: SEARCH_BEGIN }
);

export const searchSuccess = (apiobj) => ({
  type: SEARCH_SUCCESS,
  payload: {
    apiobj,
  },
});

export const addExpense = (data, state) => {
  // console.log(data);
  console.log(state);
  return {
    type: ADD_EXPENSE,
    payload: {
      data,
      state,
    },
  };
};

export const deleteExpense = (arrayToMantain) => ({
  type: DELETE_EXPENSE,
  payload: arrayToMantain,
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  payload: expenseId,
});

export const editedToFalse = () => ({
  type: EDIT_TO_FALSE,
});

export const subscribe = (editedExpense) => ({
  type: SUBSCRIBE,
  payload: editedExpense,
});

export const searchFailure = (error) => ({
  type: SEARCH_ERROR,
  error,
});

// Thunk Create Action
export function fetchEconomiaAPI() {
  return async (dispatch) => {
    try {
      dispatch(searchBegin());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      // console.log(data);
      delete data.USDT;
      const coins = Object.keys(data);
      // console.log(coins);
      dispatch(searchSuccess(coins));
    } catch (error) {
      dispatch(searchFailure(error));
    }
  };
}

// Outra Thunk Create Action
export function addExpenses(state) {
  return async (dispatch) => {
    try {
      dispatch(searchBegin());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      // console.log(data);
      dispatch(addExpense(data, state));
    } catch (error) {
      dispatch(searchFailure(error));
    }
  };
}
