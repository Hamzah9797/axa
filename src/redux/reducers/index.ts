import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { allConversationDataReducer } from "./conversationReducer";
import { allInnerCompanyChatsReducer } from "./innerCompanyChatsReducer";
import { allEmployeesDataReducer } from "./employeesReducer";

const rootReducer = combineReducers({
  employee: loginReducer,
  allConversationsData: allConversationDataReducer,
  allInnerChats: allInnerCompanyChatsReducer,
  allEmployees: allEmployeesDataReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
