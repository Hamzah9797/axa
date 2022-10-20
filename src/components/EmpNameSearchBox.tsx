import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { employeesData } from "../mocks/employeeData";
import CloseIcon from "@mui/icons-material/Close";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e9ecef;
  width: 30rem;
  height: 30rem;
  overflow: scroll;
  border-radius: 8px;
  position: absolute;
  top: 55%;
  left: 83%;
  margin: auto;
  z-index: 1000;
  border: 2px solid black;
`;

const ListWrapper = styled.div`
  font-size: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  cursor: pointer;
`;

const portalDiv = document.getElementById("searchbox")!;

interface ChildProps {
  open: boolean;
  onClickCloseBtn: () => void;
  onNameClick: (name: string, empId: string) => void;
}

const EmpNameSearchBox = ({
  open,
  onClickCloseBtn,
  onNameClick,
}: ChildProps) => {
  const { employee } = useTypedSelector((state) => state);

  if (!open) return null;

  const empList = employeesData.filter(
    (emp) => emp.name !== employee.currentUser?.name
  );

  return ReactDom.createPortal(
    <Container style={{ transform: "translate(-50%,-50%)" }}>
      <ListWrapper>
        <CloseIcon onClick={onClickCloseBtn} />
        {empList.map((emp) => (
          <p
            key={emp.uuid}
            onClick={() => onNameClick(emp.name, emp.uuid)}
            style={{ borderBottom: "1px solid black" }}
          >
            {emp.name}
          </p>
        ))}
      </ListWrapper>
    </Container>,
    portalDiv
  );
};

export default EmpNameSearchBox;
