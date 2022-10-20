import { ActionType } from "../action-types";
import { EmployeeActions } from "../actions";
import { Dispatch } from "redux";
import { employeesData } from "../../mocks/employeeData";
import { RootState } from "../store";

// get all employees
export const getAllEmployees = () => {
  return async (dispatch: Dispatch<EmployeeActions>) => {
    dispatch({
      type: ActionType.GET_ALL_EMPLOYEES_REQUEST,
    });
    try {
      dispatch({
        type: ActionType.GET_ALL_EMPLOYEES_SUCCESS,
        payload: employeesData,
      });
    } catch (err) {
      dispatch({
        type: ActionType.GET_ALL_EMPLOYEES_FAIL,
        payload: "theres an error getting all the conversations",
      });
    }
  };
};

// edit one specific employee
export const editSpecificEmployee = (chatId: string, empName: string) => {
  return async (
    dispatch: Dispatch<EmployeeActions>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ActionType.EDIT_SPECIFIC_EMPLOYEE_REQUEST,
    });
    try {
      const { allEmployees } = getState();
      const Mentionedemp = allEmployees.allEmployeesData?.find(
        (emp) => emp.name === empName
      );
      dispatch({
        type: ActionType.EDIT_SPECIFIC_EMPLOYEE_SUCCESS,
        payload: {
          uuid: Mentionedemp ? Mentionedemp?.uuid : "",
          name: Mentionedemp ? Mentionedemp?.name : "",
          role: Mentionedemp ? Mentionedemp?.role : "",
          email: Mentionedemp ? Mentionedemp?.email : "",
          password: Mentionedemp ? Mentionedemp?.password : "",
          status: Mentionedemp ? Mentionedemp?.status : "",
          mentioned: [...(Mentionedemp?.mentioned || []), chatId],
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.EDIT_SPECIFIC_EMPLOYEE_FAIL,
        payload: "theres an error getting the specific employee",
      });
    }
  };
};

// remove from mentions
export const removeFromMentions = (chatId: string, empName: string) => {
  return async (
    dispatch: Dispatch<EmployeeActions>,
    getState: () => RootState
  ) => {
    const { allEmployees } = getState();
    // current emp
    const Mentionedemp = allEmployees.allEmployeesData?.find(
      (emp) => emp.name === empName
    );

    dispatch({
      type: ActionType.REMOVE_FROM_MENTIONS,
      payload: {
        uuid: Mentionedemp ? Mentionedemp?.uuid : "",
        name: Mentionedemp ? Mentionedemp?.name : "",
        role: Mentionedemp ? Mentionedemp?.role : "",
        email: Mentionedemp ? Mentionedemp?.email : "",
        password: Mentionedemp ? Mentionedemp?.password : "",
        status: Mentionedemp ? Mentionedemp?.status : "",
        mentioned: Mentionedemp
          ? Mentionedemp.mentioned.filter((id) => id !== chatId)
          : [],
      },
    });
  };
};
