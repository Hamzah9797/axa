import React, { useState } from "react";
import styled from "styled-components";
import { predefinedMessages } from "../mocks/predefinedMessages";
import { useTypedSelector } from "../hooks/useTypedSelector";

//components
import NavBar from "../components/NavBar";
import CustomerFamilyInfo from "../components/CustomerFamilyInfo";
import ChatBox from "../components/ChatBox";
import IndividualArchivesBox from "../components/IndividualArchiveBox";
import InnerCompanyChat from "../components/InnerCompanyChat";

//styled components
const Container = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem;
`;

// #dee2e6
const InboxContainer = styled.div`
  width: 100%;
  height: 86vh;
`;

const ShowArchvChatBtn = styled.div`
  width: 30rem;
  height: 5rem;
  background-color: #dee2e6;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 3rem;
  cursor: pointer;
`;

const ShowInnerCompChatBtn = styled.div`
  width: 30rem;
  height: 5rem;
  background-color: #dee2e6;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 3rem;
  cursor: pointer;
`;

const CoversationPage = () => {
  const [archives, setShowArchives] = useState(false);
  const [companyChat, setCompanyChat] = useState(false);

  const { employee } = useTypedSelector((state) => state);

  const getMessages = () => {
    return predefinedMessages.filter((msg) =>
      msg?.roles?.includes(employee?.currentUser?.role!)
    );
  };

  const handleBtnClick = (flag: string) => {
    if (flag === "archive") {
      setShowArchives(true);
      setCompanyChat(false);
    }
    if (flag === "company") {
      setShowArchives(false);
      setCompanyChat(true);
    }
  };

  return (
    <div>
      <NavBar />
      <InboxContainer>
        <Container>
          <ChatBox msgs={getMessages()} />
          <CustomerFamilyInfo />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "5rem" }}
          >
            {!archives && !companyChat && (
              <ShowArchvChatBtn onClick={() => handleBtnClick("archive")}>
                Archives
              </ShowArchvChatBtn>
            )}
            {!companyChat && !archives && (
              <ShowInnerCompChatBtn onClick={() => handleBtnClick("company")}>
                Company Chat
              </ShowInnerCompChatBtn>
            )}
          </div>
          {archives && (
            <IndividualArchivesBox
              onCloseBtnClick={() => setShowArchives(false)}
            />
          )}
          {companyChat && (
            <InnerCompanyChat onCloseBtnClick={() => setCompanyChat(false)} />
          )}
        </Container>
      </InboxContainer>
    </div>
  );
};

export default CoversationPage;

{
  /* <div
onClick={() =>
  archives ? setShowArchives(false) : setShowArchives(true)
}
style={{ cursor: "pointer" }}
> */
}
