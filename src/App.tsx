// dependencies
import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

//pages
import Login from "./pages/Login";
import InboxPage from "./pages/InboxPage";
import ConversationPage from "./pages/ConversationPage";
import CustomerSearchPage from "./pages/CustomerSearchPage";
import { useTypedActions } from "./hooks/useTypedActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { getAllConversations } from "./redux/action-creators/conversationActions";
import { getAllInnerCompanyChats } from "./redux/action-creators/innerCompanyChatActions";
import { getAllEmployees } from "./redux/action-creators/employeeActions";

// specific conversation by id context
interface ISpecificConversationId {
  specificConversationId: string;
  setSpecificConversationId?: (value: string) => void;
}

const defaultState = {
  specificConversationId: "",
};

export const SpecificConversationIdContext =
  React.createContext<ISpecificConversationId>(defaultState);

// ------------------------------------

// specific customer by id context
interface ISpecificCustomerId {
  specificCustomerId: string;
  setSpecificCustomerId?: (value: string) => void;
}

const defaultStateTwo = {
  specificCustomerId: "",
};

export const SpecificCustomerIdContext =
  React.createContext<ISpecificCustomerId>(defaultStateTwo);

// ------------------------------------

function App() {
  // for context use
  const [specificConversationId, setSpecificConversationId] = useState(
    defaultState.specificConversationId
  );
  const [specificCustomerId, setSpecificCustomerId] = useState(
    defaultStateTwo.specificCustomerId
  );

  // get all conversations
  const getAllConverFunc = useTypedActions(getAllConversations);
  // get all inner chats
  const getAllInnerCompChatsFunc = useTypedActions(getAllInnerCompanyChats);
  // get all employeess
  const getAllEmployeesFunc = useTypedActions(getAllEmployees);

  useEffect(() => {
    getAllConverFunc();
    getAllInnerCompChatsFunc();
    getAllEmployeesFunc();
  }, []);

  const { employee } = useTypedSelector((state) => state);
  const user = employee.currentUser;

  return (
    <SpecificConversationIdContext.Provider
      value={{ specificConversationId, setSpecificConversationId }}
    >
      <SpecificCustomerIdContext.Provider
        value={{ specificCustomerId, setSpecificCustomerId }}
      >
        <Login />
      </SpecificCustomerIdContext.Provider>
    </SpecificConversationIdContext.Provider>
  );
}

export default App;

{
  /* <Router>
          <Switch>
            <Route exact path="/">
              <Login />
              {user ? <Redirect to="/inbox" /> : <Login />}
            </Route>
            <Route exact path="/inbox">
              {user === null ? <Redirect to="/" /> : <InboxPage />}
            </Route>
            <Route exact path="/conversation">
              <ConversationPage />
            </Route>
            <Route exact path="/customerSearch">
              <CustomerSearchPage />
            </Route>
          </Switch>
        </Router> */
}
