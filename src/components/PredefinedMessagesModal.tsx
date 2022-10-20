import React, { useState } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";

//icons
import CloseIcon from "@mui/icons-material/Close";
import { PredefinedMessages } from "../types";

//styles

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e9ecef;
  width: 100rem;
  height: 70rem;
  overflow: scroll;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: auto;
  z-index: 1000;
  border: 2px solid black;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(200, 200, 200, 0.7);
  z-index: 1000;
`;

const QuestionBoxContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

const QuestionBox = styled.div`
  background-color: #f8f9fa;
  border: solid 2px black;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  overflow: scroll;
  height: 15rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const SearchBox = styled.input`
  width: 50rem;
  height: 3rem;
`;

interface ChildProps {
  open: boolean;
  onClose: () => void;
  msgs: PredefinedMessages;
  onBoxSelect: (content: string) => void;
}

const portalDiv = document.getElementById("portal")!;

const PredefinedMessagesModal = ({
  open,
  onClose,
  msgs,
  onBoxSelect,
}: ChildProps) => {
  const [filteredMsgs, setfilteredMsgs] = useState(msgs);

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setfilteredMsgs(
        msgs.filter((msg) =>
          msg.message.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
    if (e.target.value.length < 1) {
      setfilteredMsgs(msgs);
    }
  };

  const handleClick = (msg: string) => {
    if (msg) {
      onBoxSelect(msg);
    }
    setfilteredMsgs(msgs);
    onClose();
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <Overlay />
      <ModalContainer style={{ transform: "translate(-50%,-50%)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem 2rem",
          }}
        >
          <div onClick={() => handleClick("")}>
            <CloseIcon style={{ fontSize: "3rem", cursor: "pointer" }} />
          </div>
        </div>
        <div style={{ padding: "2rem" }}>
          <SearchBox onChange={(e) => handleChage(e)} />
        </div>
        <QuestionBoxContainer>
          {filteredMsgs.map((msg, i) => {
            return (
              <QuestionBox key={i} onClick={() => handleClick(msg.message)}>
                <p style={{ fontSize: "2rem" }}>{msg.message}</p>
              </QuestionBox>
            );
          })}
        </QuestionBoxContainer>
      </ModalContainer>
    </>,
    portalDiv
  );
};

export default PredefinedMessagesModal;
