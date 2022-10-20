import React, { useState } from "react";
import styled from "styled-components";

//components
import NavBar from "../components/NavBar";
import LeftBar from "../components/LeftBar";
import InboxTable from "../components/InboxTable";

//styled components
const Container = styled.div`
  display: flex;
  gap: 5rem;
`;

const InboxContainer = styled.div`
  width: 100rem;
  height: 84vh;
  background-color: #dee2e6;
  padding: 2rem;
`;

//context
interface IInboxTypeContext {
  specificInbox: string;
  setSpecificInbox?: (value: string) => void;
}
const defaultState = {
  specificInbox: "Posteingang alle",
};
export const InboxTypeContext =
  React.createContext<IInboxTypeContext>(defaultState);

const InboxPage = () => {
  // inbox = postengang alle || claims || important etc
  const [specificInbox, setSpecificInbox] = useState(
    defaultState.specificInbox
  );

  console.log(specificInbox);

  return (
    <div>
      <InboxTypeContext.Provider value={{ specificInbox, setSpecificInbox }}>
        <NavBar />
        <Container>
          <LeftBar />
          <InboxContainer>
            <InboxTable />
          </InboxContainer>
        </Container>
      </InboxTypeContext.Provider>
    </div>
  );
};

export default InboxPage;
