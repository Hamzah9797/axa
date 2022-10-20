import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { SpecificCustomerIdContext } from "../App";
import { Conversation } from "../types";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WebIcon from "@mui/icons-material/Web";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CloseIcon from "@mui/icons-material/Close";

// styled components
// #dee2e6
const InboxContainer = styled.div`
  width: 45rem;
  height: 80vh;
  background-color: #dee2e6;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const MiniContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 40rem;
  height: 5rem;
  margin: 0 auto;
`;

const ArchiveListContaier = styled.div`
  width: 40rem;
  height: 70vh;
  background-color: #ced4da;
  over-flow: scroll;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const ArchiveItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem;
  border-bottom: 2px solid white;
  cursor: pointer;
`;

const BackButtonBar = styled.div`
  width: 38rem;
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ArchiveChatContainer = styled.div`
  width: 40rem;
  height: 70vh;
  background-color: white;
  over-flow: scroll;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const MessageSentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageRecieved = styled.div`
  width: 40rem;
  margin-left: 2rem;
  background-color: #dee2e6;
  display: flex;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.5rem;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MessageSent = styled.div`
  width: 60rem;
  margin-left: 10rem;
  background-color: #dee2e6;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.5rem;
`;

const MessageMethodIcon = styled.div``;

const setIcon = (msgMethod: string) => {
  if (!msgMethod) {
    return "";
  }
  if (msgMethod === "email") {
    return <AlternateEmailIcon />;
  }
  if (msgMethod === "app") {
    return <SmartphoneIcon />;
  }
  if (msgMethod === "webForm") {
    return <WebIcon />;
  }
  if (msgMethod === "portal") {
    return <WebIcon />;
  }
};

interface ChildProps {
  onCloseBtnClick: () => void;
}

const IndividualArchivesBox = ({ onCloseBtnClick }: ChildProps) => {
  const [archList, setArchList] = useState(true);
  const [archives, setArchives] = useState<Conversation[] | undefined>();
  const [specificConvo, setSpecificConvo] = useState<
    Conversation | undefined
  >();

  const { specificCustomerId } = useContext(SpecificCustomerIdContext);
  const { allConversationsData } = useTypedSelector((state) => state);

  useEffect(() => {
    getSpecificArchives(specificCustomerId);
  }, [specificCustomerId]);

  const getSpecificArchives = (id: string) => {
    const convo = allConversationsData.allConversationsData?.filter(
      (convo) => convo.customer.uuid === id && convo.closed
    );
    setArchives(convo);
  };

  const handleOnConvoClick = (id: string) => {
    setArchList(false);
    setSpecificConvo(
      allConversationsData?.allConversationsData?.find(
        (convo) => convo.uuid === id
      )
    );
  };

  const handleCloseBtnClick = () => {
    onCloseBtnClick();
  };

  return (
    <div>
      <InboxContainer>
        <MiniContainer>
          <h3
            style={{
              fontSize: "2.5rem",
              marginLeft: "2.5rem",
            }}
          >
            Archives
          </h3>
          <div onClick={handleCloseBtnClick}>
            <CloseIcon
              style={{
                fontSize: "3rem",
                cursor: "pointer",
              }}
            />
          </div>
        </MiniContainer>
        {archList && (
          <ArchiveListContaier>
            {archList &&
              archives?.map((arc) => {
                return (
                  <ArchiveItem
                    key={arc.uuid}
                    onClick={() => handleOnConvoClick(arc.uuid)}
                  >
                    <p> {arc?.messages![0].messageContent}</p>
                    <p>{arc.conversationType}</p>
                  </ArchiveItem>
                );
              })}
          </ArchiveListContaier>
        )}
        {archList === false && (
          <ArchiveChatContainer>
            <BackButtonBar onClick={() => setArchList(true)}>
              <ArrowBackIcon style={{ fontSize: "3rem", cursor: "pointer" }} />
            </BackButtonBar>
            {specificConvo?.messages?.map((msg) => {
              return (
                <MessageContainer key={msg.uuid}>
                  {msg.role === "employee" ? (
                    <MessageSent>
                      <MessageSentContainer>
                        <p>{msg.messageContent}</p>
                        <p
                          style={{
                            fontSize: "1rem",
                            alignSelf: "flex-end",
                            fontStyle: "italic",
                          }}
                        >
                          {`${msg.senderName}, ${msg.senderId}`}
                        </p>
                      </MessageSentContainer>
                    </MessageSent>
                  ) : (
                    <MessageRecieved>{msg.messageContent}</MessageRecieved>
                  )}
                  <MessageMethodIcon>
                    {setIcon(msg.messageMethod)}
                  </MessageMethodIcon>
                </MessageContainer>
              );
            })}
          </ArchiveChatContainer>
        )}
      </InboxContainer>
    </div>
  );
};

export default IndividualArchivesBox;
