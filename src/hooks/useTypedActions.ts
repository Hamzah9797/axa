/* eslint-disable */

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

export const useTypedActions = (func: any) => {
  const dispatch = useDispatch();
  return bindActionCreators(func, dispatch);
};
