import { ActionType } from "../action-types";
import { LoginActions, SignOutAction } from "../actions";
import { Dispatch } from "redux";
import { RootState } from "../reducers";

type User = {
  email: string;
  password: string;
};

export const login = (user: User) => {
  return async (
    dispatch: Dispatch<LoginActions>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ActionType.LOGIN_REQUEST,
    });
    // logic
    try {
      const { allEmployees } = getState();

      const curEmp = allEmployees?.allEmployeesData?.find(
        (emp) => emp.email === user.email && emp.password === user.password
      );
      if (curEmp) {
        dispatch({
          type: ActionType.LOGIN_SUCCESS,
          payload: curEmp,
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.LOGIN_FAIL,
        payload: "wrong user name or password",
      });
    }
  };
};

// sign out
export const signOut = () => {
  return async (dispatch: Dispatch<SignOutAction>) => {
    dispatch({
      type: ActionType.SIGN_OUT,
    });
  };
};
