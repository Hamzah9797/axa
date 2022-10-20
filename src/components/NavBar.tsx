import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { InboxTypeContext } from "../pages/InboxPage";
import { mobile, smaller } from "./../responsive";

//icons
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";

//styled components

const Container = styled.div`
  height: 9rem;
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  font-size: 3rem;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const BoxLeft = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

const BoxRight = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  font-size: 2rem;
  ${mobile({ fontSize: "1.5rem" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  margin-left: 1rem;
  padding: 1rem;
`;

const ArbeistoolTwo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 2rem;
  background-color: lightgray;
  padding: 1rem 2rem;
  ${mobile({ fontSize: "1.5rem" })};
  ${smaller({ fontSize: "1.2rem" })};
`;

interface InboxType {
  inboxName: string;
}

const ArbeistoolThree = styled.div<InboxType>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 2rem;
  background-color: ${(props) => {
    if (props.inboxName === "company") {
      return "black";
    } else {
      return "lightgray";
    }
  }};
  color: ${(props) => {
    if (props.inboxName === "company") {
      return "white";
    } else {
      return "black";
    }
  }};
  padding: 1rem 2rem;
  ${mobile({ fontSize: "1.5rem" })};
  ${smaller({ fontSize: "1.2rem" })};
`;

const Logo = styled.div`
display;flex;
width:3rem;
height:3rem;
background-color:blue;
`;

const BackBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: lightgray;
`;

interface BadgeCount {
  mentionCount: number | undefined;
}

const Badge = styled.div<BadgeCount>`
  background-color: ${(props) => {
    if (props.mentionCount === 0) {
      return "gray";
    } else {
      return "red";
    }
  }};
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${mobile({ height: "1.5rem", width: "1.5rem" })};
  ${mobile({ height: "1rem", width: "1rem" })};
`;

const NavBar = () => {
  const { employee } = useTypedSelector((state) => state);
  const { allEmployees } = useTypedSelector((state) => state);
  const history = useHistory();
  const { specificInbox, setSpecificInbox } = useContext(InboxTypeContext);

  const curEmp = allEmployees?.allEmployeesData?.find(
    (emp) => employee.currentUser?.uuid === emp.uuid
  );

  const handleNotificationClick = () => {
    setSpecificInbox?.("company");
    history.push("/inbox");
  };

  return (
    <Container>
      <BoxLeft>
        <Logo />
        {window.location.pathname !== "/inbox" && (
          <BackBox
            onClick={() => {
              history.push("/inbox");
            }}
          >
            <ArrowBackIcon />
          </BackBox>
        )}
        <ChatBubbleIcon
          style={{ color: "gray", fontSize: "3rem" }}
          onClick={() => {
            history.push("/customerSearch");
          }}
        />
        <SearchContainer>
          <MessageOutlinedIcon style={{ color: "gray" }} />
          <Input placeholder="Kommunik" />
        </SearchContainer>
        <ArbeistoolTwo>
          <EventNoteIcon style={{ color: "gray" }} />
          <p>Arbeistool 2</p>
        </ArbeistoolTwo>
        <ArbeistoolTwo>
          <AccountBoxIcon style={{ color: "gray" }} />
          <p>Arbeistool 3</p>
        </ArbeistoolTwo>
        <ArbeistoolTwo>
          <CheckBoxIcon style={{ color: "gray" }} />
          <p>Arbeistool 4</p>
        </ArbeistoolTwo>
        <ArbeistoolThree
          inboxName={specificInbox}
          onClick={handleNotificationClick}
          style={{ cursor: "pointer" }}
        >
          <NotificationsIcon style={{ color: "gray" }} />
          <p>Chat Mentions</p>
          <Badge mentionCount={curEmp?.mentioned.length}>
            {curEmp?.mentioned.length}
          </Badge>
        </ArbeistoolThree>
      </BoxLeft>
      <BoxRight>
        <div>
          <p>{`${employee.currentUser?.name}`}</p>
          <p>{`${employee.currentUser?.uuid}`}</p>
        </div>
        <AccountCircleRoundedIcon style={{ color: "gray", fontSize: "6rem" }} />
      </BoxRight>
    </Container>
  );
};

export default NavBar;
