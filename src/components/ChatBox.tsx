import React, { useState } from "react";
import styled from "styled-components";
import { PredefinedMessages } from "../types";
import { useContext } from "react";
import { useTypedActions } from "../hooks/useTypedActions";
import {
  SpecificConversationIdContext,
  SpecificCustomerIdContext,
} from "../App";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  editSpecificConversation,
  makeNewConversation,
} from "../redux/action-creators/conversationActions";
import { v1 as uuidv1 } from "uuid";
import PredefinedMessagesModal from "./PredefinedMessagesModal";
import { smallerHeight, smallestHeight } from "./../responsive";

//icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WebIcon from "@mui/icons-material/Web";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AttachmentIcon from "@mui/icons-material/Attachment";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";

// styled components
// #dee2e6
const InboxContainer = styled.div`
  width: 80rem;
  height: 80vh;
  background-color: #dee2e6;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ChatContaier = styled.div`
  width: 70rem;
  height: 70vh;
  background-color: white;
  margin: auto;
`;

const SubContaier = styled.div`
  width: 70rem;
  height: 5vh;
  margin: auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.5rem;
  border-bottom: 2px black solid;
`;

const SubChatBar = styled.div`
  width: 100%;
  height: 3vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 1rem;
  padding-top: 1rem;
`;

interface convoClosedState {
  isClosed?: boolean;
}

const ConvoClosedBtn = styled.div<convoClosedState>`
  background-color: white;
  padding: 0.5rem;
  border-radius: 20px;
  border: 2px solid gray;
  color: ${(props) => (props.isClosed ? "red" : "gray")};
  cursor: pointer;
`;

const ConvoReleaseAssignBtn = styled.div`
  background-color: white;
  padding: 0.5rem;
  border-radius: 20px;
  border: 2px solid gray;
  color: gray;
  cursor: pointer;
`;

const MainMessagesWrapper = styled.div`
  display: flex;
  padding-top: 1.5rem;
  flex-direction: column;
  gap: 2rem;
  height: 51rem;
  overflow: scroll;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
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

const MessageSent = styled.div`
  width: 40rem;
  margin-left: 28rem;
  background-color: #dee2e6;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.5rem;
`;

const MessageSentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem;
  height: 14rem;
  align-items: center;
  gap: 2rem;
  ${smallerHeight({ height: "4rem" })};
  ${smallestHeight({ height: "1rem" })};
`;

const InputMiniContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 58rem;
  height: 12rem;
`;

interface ImportantClicked {
  impClicked: boolean | null | undefined;
}

const Icon = styled.div<ImportantClicked>`
  color: ${(props) => (props.impClicked ? "blue" : "gray")};
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
  msgs: PredefinedMessages;
}

const ChatBox = ({ msgs }: ChildProps) => {
  const { employee } = useTypedSelector((state) => state);
  const { allConversationsData } = useTypedSelector((state) => state);
  const { specificConversationId } = useContext(SpecificConversationIdContext);
  const { specificCustomerId } = useContext(SpecificCustomerIdContext);
  const [openModal, setOpenModal] = useState(false);

  const conversation = allConversationsData?.allConversationsData?.find(
    (convo) => convo.uuid === specificConversationId
  );

  const customer = allConversationsData.allConversationsData?.find(
    (conv) => conv.customer.uuid === specificCustomerId
  )?.customer;

  const editConvoFunc = useTypedActions(editSpecificConversation);
  const makeNewConvoFunc = useTypedActions(makeNewConversation);

  const [messageInput, setMessageInput] = useState("");
  const [importantClicked, setImportantClicked] = useState(
    conversation?.important
  );
  const [isConvoClosed, setIsConvoClosed] = useState(conversation?.closed);

  const handleImportantClick = () => {
    if (importantClicked && !conversation?.closed) {
      setImportantClicked(false);
      editConvoFunc(
        conversation?.uuid,
        conversation?.conversationType,
        conversation?.currentOwnerId,
        conversation?.currentOwnerName,
        conversation?.status,
        false,
        conversation?.closed
      );
    }
    if (!importantClicked && !conversation?.closed) {
      setImportantClicked(true);
      editConvoFunc(
        conversation?.uuid,
        conversation?.conversationType,
        conversation?.currentOwnerId,
        conversation?.currentOwnerName,
        conversation?.status,
        true,
        conversation?.closed
      );
    }
  };

  const handleAssignRelClick = (assign: boolean) => {
    if (assign && !conversation?.closed) {
      editConvoFunc(
        conversation?.uuid,
        employee.currentUser?.role,
        employee.currentUser?.uuid,
        employee.currentUser?.name,
        "assigned",
        conversation?.important,
        conversation?.closed
      );
    }
    if (!assign && !conversation?.closed) {
      editConvoFunc(
        conversation?.uuid,
        "",
        "",
        "",
        "unassigned",
        conversation?.important,
        conversation?.closed
      );
    }
  };

  const handleConvoClosedClick = () => {
    if (conversation?.currentOwnerId === employee.currentUser?.uuid) {
      if (isConvoClosed) {
        setIsConvoClosed(false);
        editConvoFunc(
          conversation?.uuid,
          employee.currentUser?.role,
          conversation?.currentOwnerId,
          conversation?.currentOwnerName,
          conversation?.status,
          conversation?.important,
          false
        );
      }
      if (!isConvoClosed) {
        setIsConvoClosed(true);
        editConvoFunc(
          conversation?.uuid,
          conversation?.conversationType,
          conversation?.currentOwnerId,
          conversation?.currentOwnerName,
          conversation?.status,
          false,
          true
        );
      }
    }
  };

  const sendNewMessage = () => {
    if (
      conversation?.currentOwnerId === employee.currentUser?.uuid &&
      !conversation?.closed
    ) {
      editConvoFunc(
        conversation?.uuid,
        conversation?.conversationType,
        conversation?.currentOwnerId,
        conversation?.currentOwnerName,
        conversation?.status,
        conversation?.important,
        conversation?.closed,
        {
          uuid: String(uuidv1()),
          senderId: conversation?.currentOwnerId || "",
          senderName: conversation?.currentOwnerName || "",
          messageContent: messageInput,
          messageMethod: "portal",
          messageSentDate: new Date(),
          role: "employee",
        }
      );
    }
    if (
      allConversationsData.allConversationsData?.find(
        (con) => con.uuid === specificConversationId
      ) === undefined &&
      specificConversationId !== ""
    ) {
      makeNewConvoFunc(
        specificConversationId,
        employee.currentUser?.role,
        [employee.currentUser?.uuid],
        employee.currentUser?.uuid,
        employee.currentUser?.name,
        customer,
        "assigned",
        false,
        false,
        [
          {
            uuid: String(uuidv1()),
            senderId: employee.currentUser?.uuid,
            senderName: employee.currentUser?.name,
            messageContent: messageInput,
            messageMethod: "portal",
            messageSentDate: new Date(),
            role: "employee",
          },
        ]
      );
    }
    setMessageInput("");
  };

  return (
    <div>
      <InboxContainer>
        <SubContaier>
          <Icon impClicked={importantClicked} onClick={handleImportantClick}>
            <NotificationImportantOutlinedIcon style={{ fontSize: "3rem" }} />
          </Icon>
          <p style={{ fontWeight: "bold" }}>Message Subject</p>
          <ConvoClosedBtn
            onClick={handleConvoClosedClick}
            isClosed={isConvoClosed}
          >
            Vorgang abschliessen
          </ConvoClosedBtn>
          {employee.currentUser?.uuid === conversation?.currentOwnerId ? (
            <ConvoReleaseAssignBtn onClick={() => handleAssignRelClick(false)}>
              Release Me
            </ConvoReleaseAssignBtn>
          ) : (
            <ConvoReleaseAssignBtn onClick={() => handleAssignRelClick(true)}>
              Assign Me
            </ConvoReleaseAssignBtn>
          )}
        </SubContaier>
        <ChatContaier>
          <SubChatBar>
            <MoreVertIcon style={{ color: "gray", fontSize: "3rem" }} />
          </SubChatBar>
          <MainMessagesWrapper>
            {conversation?.messages?.map((msg) => {
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
          </MainMessagesWrapper>

          <PredefinedMessagesModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            msgs={msgs}
            onBoxSelect={(content: string) => setMessageInput(content)}
          />

          <InputContainer>
            <InputMiniContainer>
              <div onClick={() => setOpenModal(true)}>
                <WidgetsOutlinedIcon
                  style={{ color: "gray", fontSize: "3rem", cursor: "pointer" }}
                />
              </div>
              <AttachmentIcon style={{ color: "gray", fontSize: "3rem" }} />
            </InputMiniContainer>
            <Input
              value={messageInput}
              onInput={(e) =>
                setMessageInput((e.target as HTMLInputElement).value)
              }
            />
            <InputMiniContainer>
              <AlternateEmailIcon style={{ color: "gray", fontSize: "3rem" }} />
              <SendOutlinedIcon
                style={{
                  color: "gray",
                  fontSize: "3rem",
                  border: "solid gray 2px",
                  width: "6rem",
                  borderRadius: "8px",
                }}
                onClick={sendNewMessage}
              />
            </InputMiniContainer>
          </InputContainer>
        </ChatContaier>
      </InboxContainer>
    </div>
  );
};
export default ChatBox;
