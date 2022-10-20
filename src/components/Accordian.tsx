import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { InboxTypeContext } from "../pages/InboxPage";
import { employeesData } from "../mocks/employeeData";

// icon
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";

const InboxTypeButtonContainer = styled.div``;

interface MainBoxState {
  inboxContext: string;
  catClicked: string;
  employeePosition: string;
}

//"#adb5bd"
const MainBox = styled.div<MainBoxState>`
background-color: ${(props) => {
  if (props.inboxContext === props.catClicked) {
    return "black";
  } else {
    return "#f1f3f5";
  }
}};
}};
color: ${(props) => {
  if (
    props.catClicked !== props.employeePosition &&
    props.catClicked !== "Posteingang alle" &&
    props.catClicked !== "Archiv"
  ) {
    return "#adb5bd";
  }
  if (props.inboxContext === props.catClicked) {
    return "white";
  } else {
    return "black";
  }
}};
  width: 20rem;
  padding: 1rem 0rem;
  padding-left: 1.3rem;
  border-radius: 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content:space-between;
  align-items: center;
  cursor: pointer;
`;

interface ChildrenBox {
  clickedCat: string;
}

const ChildrenBox = styled.div<ChildrenBox>`
  background-color:${(props) => {
    if (props.clickedCat === "important") {
      return "black;";
    } else {
      return "#f1f3f5;";
    }
  }} 
  color: ${(props) => {
    if (props.clickedCat === "important") {
      return "white;";
    } else {
      return "black;";
    }
  }} 
  width: 20rem;
  margin-top: 1.2rem;
  margin-left: 5rem;
  padding: 0.6rem;
  border-radius: 10px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

interface EmpBox {
  empId: string;
  clickedCat: string;
  currentUserId: string;
  empStatus: string;
  empRole: string;
}

const EmployeeBox = styled.div<EmpBox>`
  background-color: ${(props) => {
    if (props.empId !== props.currentUserId && props.empStatus !== "active") {
      return "#adb5bd;";
    }
    if (props.empId !== props.currentUserId && props.empStatus === "active") {
      return "#e9ecef;";
    }
    if (
      props.empId === props.currentUserId &&
      props.clickedCat !== "employeeConvo"
    ) {
      return "#e9ecef;";
    }
    if (
      props.empId === props.currentUserId &&
      props.clickedCat === "employeeConvo"
    ) {
      return "black;";
    }
  }}
  color: ${(props) => {
    if (props.empId !== props.currentUserId && props.empStatus !== "active") {
      return "#ced4da;";
    }
    if (props.empId !== props.currentUserId && props.empStatus === "active") {
      return "#ced4da;";
    }
    if (
      props.empId === props.currentUserId &&
      props.clickedCat !== "employeeConvo"
    ) {
      return "black;";
    }
    if (
      props.empId === props.currentUserId &&
      props.clickedCat === "employeeConvo"
    ) {
      return "white;";
    }
  }}
  width: 20rem;
  margin-top: 1.2rem;
  padding: 0.6rem;
  border-radius: 10px;
  font-size: 1.5rem;
  display: flex;
  cursor: pointer;
`;

const EmpBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
`;

// type
type Accordian = {
  catName: string;
  subCat: string[] | null;
};

const Accordian = ({ catName, subCat }: Accordian) => {
  const { specificInbox, setSpecificInbox } = useContext(InboxTypeContext);

  const { employee } = useTypedSelector((state) => state);

  const [showSubCat, setShowSubCat] = useState(false);

  // main box = kundenservice , archiv etc
  const handleClickOnMainBox = (cat: string) => {
    if (
      employee.currentUser?.role === cat ||
      cat === "Posteingang alle" ||
      cat === "Archiv"
    ) {
      setSpecificInbox?.(cat);
    }
  };

  // important , the employee etc
  const handleShowSubCat = (cat: string, state: boolean) => {
    if (employee.currentUser?.role === cat) {
      setShowSubCat(state);
    }
  };

  const handleClickOnSubCat = (cat: string, empId: string) => {
    if (cat === "Dringendes") {
      setSpecificInbox?.("important");
    }
    if (cat === "employee" && empId === employee.currentUser?.uuid) {
      setSpecificInbox?.("employeeConvo");
    }
  };

  return (
    <InboxTypeButtonContainer>
      {/* main box */}
      <MainBox
        key={catName}
        inboxContext={specificInbox}
        catClicked={catName}
        employeePosition={employee.currentUser?.role ?? ""}
        onClick={() => handleClickOnMainBox(catName)}
      >
        {catName}
        {subCat !== null && !showSubCat ? (
          <KeyboardArrowDownRoundedIcon
            style={{ fontSize: "3rem", cursor: "pointer" }}
            onClick={() => handleShowSubCat(catName, true)}
          />
        ) : subCat !== null && showSubCat ? (
          <KeyboardArrowUpRoundedIcon
            style={{ fontSize: "3rem" }}
            onClick={() => handleShowSubCat(catName, false)}
          />
        ) : (
          ""
        )}
      </MainBox>
      {/* sub cat */}
      {showSubCat &&
        subCat?.map((cat) => {
          return (
            <div key={cat}>
              <ChildrenBox
                key={cat}
                clickedCat={specificInbox}
                onClick={() => handleClickOnSubCat(cat, "")}
              >
                {cat}
              </ChildrenBox>
            </div>
          );
        })}
      {/* emp box */}
      {showSubCat &&
        employeesData.map((emp) => {
          return (
            <EmpBoxContainer key={emp.uuid}>
              {emp.status === "onLeave" ? (
                <ChildFriendlyIcon
                  style={{ color: "gray", fontSize: "3rem" }}
                ></ChildFriendlyIcon>
              ) : emp.status === "vacation" ? (
                <BeachAccessIcon
                  style={{ color: "gray", fontSize: "3rem" }}
                ></BeachAccessIcon>
              ) : (
                <p style={{ color: "#dee2e6", fontSize: "3rem" }}>po</p>
              )}
              <EmployeeBox
                key={emp.uuid}
                empId={emp.uuid}
                clickedCat={specificInbox}
                currentUserId={employee.currentUser?.uuid || ""}
                empStatus={emp.status}
                empRole={emp.role}
                onClick={() => handleClickOnSubCat("employee", emp.uuid)}
              >
                {emp.name}
              </EmployeeBox>
            </EmpBoxContainer>
          );
        })}
    </InboxTypeButtonContainer>
  );
};

export default Accordian;
