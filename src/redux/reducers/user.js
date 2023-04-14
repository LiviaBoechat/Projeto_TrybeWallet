import { SUBMIT_USER_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };

  default: return state;
  }
};

export default userReducer;
