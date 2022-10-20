import { ActionType } from "../action-types";
import { EmployeeActions } from "../actions";
import { Employee } from "../../types/index";

interface AllEmployeesState {
  allEmployeesData: Employee[] | undefined | null;
  isFetching: boolean;
  error: boolean | string;
}

const initialState = {
  allEmployeesData: null,
  isFetching: false,
  error: false,
};

// all employees
export const allEmployeesDataReducer = (
  state: AllEmployeesState = initialState,
  action: EmployeeActions
): AllEmployeesState => {
  // all conversation
  switch (action.type) {
    case ActionType.GET_ALL_EMPLOYEES_REQUEST:
      return {
        allEmployeesData: null,
        isFetching: true,
        error: false,
      };
    case ActionType.GET_ALL_EMPLOYEES_SUCCESS:
      return {
        allEmployeesData: action.payload,
        isFetching: false,
        error: false,
      };
    case ActionType.GET_ALL_EMPLOYEES_FAIL:
      return {
        allEmployeesData: null,
        isFetching: false,
        error: action.payload,
      };

    // edit a employee
    case ActionType.EDIT_SPECIFIC_EMPLOYEE_SUCCESS: {
      const editedEmp = action.payload;
      return {
        ...state,
        allEmployeesData: state.allEmployeesData?.map((emp) =>
          emp.uuid === editedEmp?.uuid ? editedEmp : emp
        ),
        isFetching: false,
        error: false,
      };
    }

    // remove from mentions
    case ActionType.REMOVE_FROM_MENTIONS: {
      const editedEmp = action.payload;
      return {
        ...state,
        allEmployeesData: state.allEmployeesData?.map((emp) =>
          emp.uuid === editedEmp?.uuid ? editedEmp : emp
        ),
        isFetching: false,
        error: false,
      };
    }

    // default
    default:
      return state;
  }
};
