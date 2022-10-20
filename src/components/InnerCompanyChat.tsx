import React, { useState } from "react";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useContext } from "react";
import { useTypedActions } from "../hooks/useTypedActions";
import {
  editSpecificInnerCompanyChat,
  removeFromParticipants,
  makeNewCompanyChat,
} from "../redux/action-creators/innerCompanyChatActions";
import { SpecificConversationIdContext } from "../App";
import { v1 as uuidv1 } from "uuid";
import EmpNameSearchBox from "./EmpNameSearchBox";
import {
  editSpecificEmployee,
  removeFromMentions,
} from "../redux/action-creators/employeeActions";

//icons
import CloseIcon from "@mui/icons-material/Close";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

// styled components
const MainContainer = styled.div`
  width: 45rem;
  height: 80vh;
  background-color: #dee2e6;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  background-color: white;
  padding: 2rem 1rem;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 45rem;
  overflow: scroll;
`;

const MessageSent = styled.div`
  width: 100%;
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

const CloseIconContainer = styled.div``;

const Input = styled.input`
  width: 100%;
  height: 12rem;
`;
const IconsContainer = styled.div`
  display: flex;

  justify-content: flex-end;
`;

interface ChildProps {
  onCloseBtnClick: () => void;
}

const InnerCompanyChat = ({ onCloseBtnClick }: ChildProps) => {
  const handleCloseBtnClick = () => {
    onCloseBtnClick();
  };

  const { allInnerChats } = useTypedSelector((state) => state);
  const { employee } = useTypedSelector((state) => state);
  const { allEmployees } = useTypedSelector((state) => state);
  const { allConversationsData } = useTypedSelector((state) => state);

  // for navigation purposes
  const { specificConversationId } = useContext(SpecificConversationIdContext);

  // cureent specific chat
  const chat = allInnerChats.allInnerCompanyChatData?.find(
    (chat) => chat.ConversationUuid === specificConversationId
  );

  // current conversation
  const conversation = allConversationsData?.allConversationsData?.find(
    (convo) => convo.uuid === specificConversationId
  );

  const [messageInput, setMessageInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mentioned, setMentioned] = useState<string[]>([]);

  const editChatFunc = useTypedActions(editSpecificInnerCompanyChat);
  const editEmpFunc = useTypedActions(editSpecificEmployee);
  const removeFromMentionsFunc = useTypedActions(removeFromMentions);
  const removeFromParticipantsFunc = useTypedActions(removeFromParticipants);
  const makeNewCompChatFunc = useTypedActions(makeNewCompanyChat);

  const sendNewMessage = () => {
    if (chat === undefined) {
      if (conversation === undefined) {
        alert("start a conversation by sending a message");
      }

      if (conversation !== undefined) {
        const newId = String(uuidv1());

        mentioned.forEach((name) => {
          if (messageInput.includes(name)) {
            const menEmp = allEmployees?.allEmployeesData?.find(
              (emp) => emp.name === name
            );
            editEmpFunc(newId, menEmp?.name);
          }
        });

        makeNewCompChatFunc(
          newId,
          [
            {
              uuid: String(uuidv1()),
              senderId: employee.currentUser?.uuid,
              senderName: employee.currentUser?.name,
              messageContent: messageInput,
              messageMethod: "portal",
              messageSentDate: new Date(),
              role: "employee",
              read: false,
            },
          ],
          conversation?.uuid,
          conversation?.closed,
          [employee.currentUser?.uuid],
          employee.currentUser?.uuid
        );
      }
    } else {
      // find them emp sending the message  -check if he is a participant of this comp chat if not add him
      const curEmp = allEmployees.allEmployeesData?.find(
        (emp) => emp.uuid === employee.currentUser?.uuid
      );
      if (!chat?.EmployeeParticipantsId?.includes(curEmp?.uuid || "")) {
        editChatFunc(
          chat?.uuid,
          chat?.ConversationUuid,
          employee.currentUser?.uuid,
          chat?.CurrentOwnerId,
          undefined,
          chat?.closed
        );
      }

      // check if there are any mentions - bring those employees, check if this chat is included in their mentions if not add it
      mentioned.forEach((name) => {
        if (messageInput.includes(name)) {
          const mentionedEmp = allEmployees?.allEmployeesData?.find(
            (emp) => emp.name === name
          );
          if (
            !mentionedEmp?.mentioned.includes(chat?.uuid!) &&
            !chat?.EmployeeParticipantsId?.includes(mentionedEmp?.uuid!)
          ) {
            editEmpFunc(chat?.uuid, mentionedEmp?.name);
          }

          if (
            mentionedEmp?.mentioned.includes(chat?.uuid!) &&
            chat?.EmployeeParticipantsId?.includes(mentionedEmp?.uuid!)
          ) {
            removeFromParticipantsFunc(
              chat.ConversationUuid,
              mentionedEmp.uuid
            );
          }

          if (
            !mentionedEmp?.mentioned.includes(chat?.uuid!) &&
            chat?.EmployeeParticipantsId?.includes(mentionedEmp?.uuid!)
          ) {
            removeFromParticipantsFunc(
              chat.ConversationUuid,
              mentionedEmp?.uuid
            );
            editEmpFunc(chat?.uuid, mentionedEmp?.name);
          }

          if (
            mentionedEmp?.mentioned.includes(chat?.uuid!) &&
            !chat?.EmployeeParticipantsId?.includes(mentionedEmp?.uuid!)
          ) {
            return;
          }
        } else {
          console.log("im not here", name);
        }
      });

      // check if current chat is included in current emplyees mentions - if yes then remove it
      if (curEmp?.mentioned.includes(chat?.uuid!)) {
        removeFromMentionsFunc(chat?.uuid!, curEmp?.name);
      }

      // send the message
      editChatFunc(
        chat?.uuid,
        chat?.ConversationUuid,
        undefined,
        chat?.CurrentOwnerId,
        {
          uuid: String(uuidv1()),
          senderId: employee.currentUser?.uuid || "",
          senderName: employee.currentUser?.name || "",
          messageContent: messageInput,
          messageMethod: "portal",
          messageSentDate: new Date(),
          role: "employee",
          read: false,
        },
        chat?.closed
      );
    }
    setMessageInput("");
  };

  const handleChangeIntextArea = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "@") {
      setOpenModal(true);
    }
    if (e.key !== "@") {
      setOpenModal(false);
    }
  };

  return (
    <div>
      <MainContainer>
        <CloseIconContainer onClick={handleCloseBtnClick}>
          <CloseIcon
            style={{
              fontSize: "3rem",
              cursor: "pointer",
            }}
          />
        </CloseIconContainer>
        <InnerContainer>
          <ChatWindow>
            {chat?.messages?.map((msg) => {
              return (
                <MessageSent key={msg.uuid}>
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
              );
            })}
          </ChatWindow>
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => handleChangeIntextArea(e)}
          />
          {openModal && (
            <EmpNameSearchBox
              open={openModal}
              onClickCloseBtn={() => setOpenModal(false)}
              onNameClick={(name: string) => {
                setMessageInput(`${messageInput}${name}`);
                setOpenModal(false);
                setMentioned([...mentioned, name]);
              }}
            />
          )}
          <IconsContainer>
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
          </IconsContainer>
        </InnerContainer>
      </MainContainer>
    </div>
  );
};

export default InnerCompanyChat;
