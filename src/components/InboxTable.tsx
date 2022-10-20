import React from "react";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { InboxTypeContext } from "../pages/InboxPage";
import {
  SpecificConversationIdContext,
  SpecificCustomerIdContext,
} from "../App";
import BusinessChatTable from "./BusinessChatTable";
// icons
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WebIcon from "@mui/icons-material/Web";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";

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

const STD = styled.td`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ced4da;
  cursor: pointer;
`;

const InboxTable = () => {
  const history = useHistory();

  const { allConversationsData } = useTypedSelector((state) => state);
  const { employee } = useTypedSelector((state) => state);
  const { specificInbox } = useContext(InboxTypeContext);
  const { setSpecificConversationId } = useContext(
    SpecificConversationIdContext
  );
  const { setSpecificCustomerId } = useContext(SpecificCustomerIdContext);

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
    if (msgMethod === "webForm" || msgMethod === "portal") {
      return <WebIcon />;
    }
  };

  const conversations = allConversationsData?.allConversationsData?.filter(
    (convo) => {
      if (specificInbox === "Posteingang alle") {
        return convo.closed === false;
      }
      if (specificInbox === "Archiv") {
        return convo.closed === true;
      }
      if (specificInbox !== "Posteingang alle" && specificInbox !== "Archiv") {
        if (specificInbox === employee?.currentUser?.role) {
          return (
            convo.conversationType === employee?.currentUser?.role &&
            convo.closed === false
          );
        }
        if (specificInbox === "important") {
          return (
            convo.conversationType === employee?.currentUser?.role &&
            convo.important === true &&
            convo.closed === false
          );
        }
        if (specificInbox === "employeeConvo") {
          return (
            convo.currentOwnerId === employee?.currentUser?.uuid &&
            convo.closed === false
          );
        }
        if (specificInbox === "company") {
          return employee.currentUser?.mentioned.includes(convo.uuid);
        }
      }
    }
  );

  const getConversationOnClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    Convoid: string,
    Customerid: string
  ) => {
    setSpecificConversationId?.(Convoid);
    setSpecificCustomerId?.(Customerid);
    e.preventDefault();
    history.push("/conversation");
  };

  if (specificInbox !== "company") {
    return (
      <>
        <STable>
          <STHead>
            <STHeadTR>
              <STH>Prio</STH>
              <STH>Name</STH>
              <STH>Betreff/Thema</STH>
              <STH>Eingang</STH>
              <STH>Status</STH>
            </STHeadTR>
          </STHead>
          <STBody>
            {conversations?.map((obj) => {
              return (
                <STBodyTR
                  key={obj.uuid}
                  onClick={(e) => {
                    getConversationOnClick(e, obj.uuid, obj.customer.uuid);
                  }}
                >
                  <STD>
                    {obj.important ? <NotificationImportantOutlinedIcon /> : ""}
                  </STD>
                  <STD>{obj.customer.name}</STD>
                  <STD>
                    {obj?.messages !== undefined
                      ? setIcon(obj.messages[0].messageMethod)
                      : ""}
                    {obj.messages !== undefined
                      ? obj.messages[0].messageContent
                      : ""}
                  </STD>
                  <STD>{`${
                    obj.messages
                      ? `${new Date(
                          obj.messages[0].messageSentDate
                        ).getHours()}:${new Date(
                          obj.messages[0].messageSentDate
                        ).getMinutes()}`
                      : ""
                  }`}</STD>
                  <STD>
                    {obj.status === "assigned" ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      ""
                    )}
                  </STD>
                </STBodyTR>
              );
            })}
          </STBody>
        </STable>
      </>
    );
  } else {
    return <BusinessChatTable />;
  }
};

export default InboxTable;
