import { ActionType } from "../action-types";
import { LoginActions, SignOutAction } from "../actions";
import { Employee } from "../../types/index";

interface UserState {
  currentUser: Employee | null;
  isFetching: boolean;
  error: boolean | string;
}

const initilaState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

export const loginReducer = (
  state: UserState = initilaState,
  action: LoginActions | SignOutAction
): UserState => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      return {
        currentUser: null,
        isFetching: true,
        error: false,
      };
    case ActionType.LOGIN_SUCCESS:
      return {
        currentUser: action.payload,
        isFetching: false,
        error: false,
      };
    case ActionType.LOGIN_FAIL:
      return {
        currentUser: null,
        isFetching: false,
        error: action.payload,
      };
    case ActionType.SIGN_OUT:
      return {
        currentUser: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};
