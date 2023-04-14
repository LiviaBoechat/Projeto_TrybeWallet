import {
  EDIT_EXPENSE,
  SUBSCRIBE,
  EDIT_TO_FALSE,
} from '../actions';

const INITIAL_STATE = {
  editedExpense: {},
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  edited: false, // estado criado para parar looping do didUpdate no WalletForm
};

const walletEdit = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      edited: true,
      idToEdit: action.payload,
    };
  case SUBSCRIBE:
    return {
      ...state,
      editor: false,
    };
  case EDIT_TO_FALSE:
    return {
      ...state,
      edited: false,
    };
    // substituir no mesmo index do array para ficar no mesmo lugar
  default: return state;
  }
};

export default walletEdit;
