import React, { useState } from "react";
import { customers } from "../mocks/customerData";
import styled from "styled-components";
import { Customer } from "../types";

//styled components

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBoxesContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const BoxContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 37rem;
  height: 3rem;
`;

const SearchBtn = styled.div`
  margin-top: 2rem;
  margin-left: 6rem;
  background-color: blue;
  width: 8rem;
  padding: 1.3rem 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

interface ChildProps {
  getSearchResults: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const SearchPanel = ({ getSearchResults }: ChildProps) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [customerId, setCustomerId] = useState("");

  const searchResultsProcess = (results: Customer[]) => {
    results.length === 0 && alert("no such user was found");
    results.length !== 0 && getSearchResults(results);
    setCustomerId("");
    setFirstName("");
    setSecondName("");
    return;
  };

  const handleSearchClick = () => {
    // guard clause
    if (
      (customerId !== "" && secondName !== "") ||
      (customerId !== "" && firstName !== "")
    ) {
      alert("dont need first or second name if you have customer id");
      setCustomerId("");
      setFirstName("");
      setSecondName("");
      return;
    }
    // By Id Only
    if (customerId !== "") {
      const results = customers.filter((cus) => cus.uuid === customerId);
      searchResultsProcess(results);
      return;
    }
    // full name
    if (firstName !== "" && secondName !== "") {
      const results = customers.filter(
        (cus) => cus.name.toLowerCase() === [firstName, secondName].join(" ")
      );
      searchResultsProcess(results);
      return;
    }
    // search by first name only
    if (firstName !== "") {
      const results = customers.filter(
        (cus) =>
          firstName.toLowerCase() === cus?.name?.split(" ")[0].toLowerCase()
      );
      searchResultsProcess(results);
      return;
    }
    // second name only
    if (secondName !== "") {
      const results = customers.filter((cus) => {
        const familyName = cus.name.split(" ").slice(1).join(" ");
        return familyName.toLowerCase() === secondName.toLowerCase();
      });
      searchResultsProcess(results);
      return;
    }
  };

  return (
    <MainContainer>
      <SearchBoxesContainer>
        <BoxContainer>
          <label>First Name</label>
          <Input
            value={firstName}
            onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
          />
        </BoxContainer>
        <BoxContainer>
          <label>Family Name</label>
          <Input
            value={secondName}
            onInput={(e) => setSecondName((e.target as HTMLInputElement).value)}
          />
        </BoxContainer>
        <BoxContainer>
          <label>Customer Id</label>
          <Input
            value={customerId}
            onInput={(e) => setCustomerId((e.target as HTMLInputElement).value)}
          />
        </BoxContainer>
      </SearchBoxesContainer>
      <SearchBtn onClick={handleSearchClick}>Search</SearchBtn>
    </MainContainer>
  );
};

export default SearchPanel;
