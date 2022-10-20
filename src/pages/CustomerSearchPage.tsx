import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import {
  SpecificCustomerIdContext,
  SpecificConversationIdContext,
} from "../App";
import { v1 as uuidv1 } from "uuid";
//components
import NavBar from "../components/NavBar";
import SearchPanel from "../components/SearchPanel";
import { Customer } from "../types";

// styled components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  gap: 4rem;
`;

const ResultsListConatiner = styled.div`
  padding: 0rem 4rem;
`;

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
  border-bottom: 4px solid black;
`;

const STBody = styled.tbody``;

const STBodyTR = styled.tr``;

const STD = styled.td`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ced4da;
  cursor: pointer;
`;

const CustomerSearchPage = () => {
  const history = useHistory();

  const [searchedCustomers, setSearchedCustomers] = useState<Customer[]>([]);
  const { setSpecificCustomerId } = useContext(SpecificCustomerIdContext);
  const { setSpecificConversationId } = useContext(
    SpecificConversationIdContext
  );

  const getConversationOnClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    i: number,
    id: string
  ) => {
    // make a new id
    const newId = String(uuidv1());
    setSpecificCustomerId?.(id);
    setSpecificConversationId?.(newId);
    e.preventDefault();
    history.push("/conversation");
  };

  return (
    <>
      <NavBar />
      <Container>
        <SearchPanel getSearchResults={setSearchedCustomers} />
        <ResultsListConatiner>
          <STable>
            <STHead>
              <STHeadTR>
                <STH>Vorname</STH>
                <STH>Nachname</STH>
                <STH>Geburtsdatum</STH>
                <STH>Adresse</STH>
                <STH>Kontakt</STH>
              </STHeadTR>
            </STHead>
            <STBody>
              {searchedCustomers?.map((cus, i) => {
                return (
                  <STBodyTR
                    key={cus.uuid}
                    onClick={(e) => {
                      getConversationOnClick(e, i, cus.uuid);
                    }}
                  >
                    <STD>{cus.name.split(" ")[0]}</STD>
                    <STD>{cus.name.split(" ")[1]}</STD>
                    <STD>{cus.dob}</STD>
                    <STD>{cus.address}</STD>
                    <STD>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p>{cus.email}</p>
                        <p>{cus.phoneNumber}</p>
                      </div>
                    </STD>
                  </STBodyTR>
                );
              })}
            </STBody>
          </STable>
        </ResultsListConatiner>
      </Container>
    </>
  );
};

export default CustomerSearchPage;
