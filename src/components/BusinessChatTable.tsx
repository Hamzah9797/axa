import React from "react";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import {
  SpecificConversationIdContext,
  SpecificCustomerIdContext,
} from "../App";

//styles
const STable = styled.table`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  overflow: scroll;
`;

const STHead = styled.thead`
  position: sticky;
  z-index: 100;
`;

const STHeadTR = styled.tr``;

const STH = styled.th`
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
`;

const STBody = styled.tbody``;

const STBodyTR = styled.tr``;

interface isMentioned {
  mentionedNow: boolean;
}

const STD = styled.td<isMentioned>`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ced4da;
  cursor: pointer;
  color: ${(props) => (props.mentionedNow ? "red" : "black")};
`;

const BusinessChatTable = () => {
  const history = useHistory();

  const { allInnerChats } = useTypedSelector((state) => state);
  const { allConversationsData } = useTypedSelector((state) => state);
  const { employee } = useTypedSelector((state) => state);
  const { setSpecificCustomerId } = useContext(SpecificCustomerIdContext);
  const { setSpecificConversationId } = useContext(
    SpecificConversationIdContext
  );
  const { allEmployees } = useTypedSelector((state) => state);

  const participantsChats = allInnerChats?.allInnerCompanyChatData?.filter(
    (convo) =>
      convo.EmployeeParticipantsId?.includes(employee?.currentUser?.uuid || "")
  );

  const curEmp = allEmployees.allEmployeesData?.find(
    (emp) => emp.uuid === employee.currentUser?.uuid
  );

  const mentionsChats = allInnerChats.allInnerCompanyChatData?.filter((chat) =>
    curEmp?.mentioned.includes(chat.uuid)
  );

  const mainsChats = [...participantsChats!, ...mentionsChats!];

  const getInnerCompanyChatOnClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    Convoid: string
  ) => {
    setSpecificConversationId?.(Convoid);
    const conversation = allConversationsData?.allConversationsData?.find(
      (convo) => convo.uuid === Convoid
    );
    const customerId = conversation?.customer.uuid;
    setSpecificCustomerId?.(customerId || "");
    e.preventDefault();
    history.push("/conversation");
  };

  return (
    <STable>
      <STHead>
        <STHeadTR>
          <STH>Name</STH>
          <STH>Betreff/Thema</STH>
          <STH>Eingang</STH>
        </STHeadTR>
      </STHead>
      <STBody>
        {mainsChats !== undefined &&
          mainsChats?.map((obj) => {
            return (
              <STBodyTR
                key={obj.uuid}
                onClick={(e) => {
                  getInnerCompanyChatOnClick(e, obj.ConversationUuid);
                }}
              >
                <STD
                  mentionedNow={
                    curEmp?.mentioned.includes(obj.uuid) ? true : false
                  }
                >
                  {obj.messages !== undefined
                    ? obj.messages[obj.messages.length - 1].senderName
                    : ""}
                </STD>
                <STD
                  mentionedNow={
                    curEmp?.mentioned.includes(obj.uuid) ? true : false
                  }
                >
                  {obj.messages !== undefined
                    ? obj.messages[obj.messages.length - 1].messageContent
                    : ""}
                </STD>
                <STD
                  mentionedNow={
                    curEmp?.mentioned.includes(obj.uuid) ? true : false
                  }
                >
                  {`${
                    obj.messages
                      ? `${new Date(
                          obj.messages[obj.messages.length - 1].messageSentDate
                        ).getHours()}:${new Date(
                          obj.messages[obj.messages.length - 1].messageSentDate
                        ).getMinutes()}`
                      : ""
                  }`}
                </STD>
              </STBodyTR>
            );
          })}
      </STBody>
    </STable>
  );
};

export default BusinessChatTable;
