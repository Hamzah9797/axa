import React from "react";
import styled from "styled-components";
import { useTypedActions } from "../hooks/useTypedActions";
import { signOut } from "../redux/action-creators/loginActions";
import { useHistory } from "react-router-dom";
import Accordian from "./Accordian";

//styled components
const Container = styled.div`
  margin-left: 3rem;
  width: 30rem;
  height: 84vh;
  background-color: #dee2e6;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const SignOutButton = styled.div`
  background-color: #f1f3f5;
  width: 20rem;
  padding: 1rem 0rem;
  padding-left: 1.3rem;
  border-radius: 10px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LeftBar = () => {
  const signOutFunc = useTypedActions(signOut);
  const history = useHistory();

  const accordianCategories = [
    { name: "Posteingang alle" },
    { name: "Kundenservice", subCat: ["Dringendes"] },
    { name: "Claims", subCat: ["Dringendes"] },
    { name: "UW", subCat: ["Dringendes"] },
    { name: "Archiv" },
  ];

  const handleSignOut = () => {
    signOutFunc();
    history.push("/");
  };

  return (
    <Container>
      <h3 style={{ fontSize: "2.3rem" }}>Postfacher</h3>
      {accordianCategories.map((cat) => {
        return (
          <div key={cat.name}>
            <Accordian
              key={cat.name}
              catName={cat.name}
              subCat={cat.subCat || null}
            />
          </div>
        );
      })}
      <SignOutButton onClick={handleSignOut}>SignOut</SignOutButton>
    </Container>
  );
};

export default LeftBar;
