import React from "react";
import styled from "styled-components";
import { SpecificCustomerIdContext } from "../App";
import { useContext } from "react";
// no need redux only this page uses this data
import { famalies } from "../mocks/familyData";
import { customers } from "../mocks/customerData";

//icons
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MasksIcon from "@mui/icons-material/Masks";
import SavingsIcon from "@mui/icons-material/Savings";

// styled components
const InboxContainer = styled.div`
  width: 30rem;
  height: 80vh;
  background-color: #dee2e6;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const FamilyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.9rem;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid darkgray;
`;

const FamilyMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.9rem;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid darkgray;
`;

const CustomerFamilyInfo = () => {
  const { specificCustomerId } = useContext(SpecificCustomerIdContext);

  //customer
  const customer = customers.find((cus) => cus.uuid === specificCustomerId);

  //family head
  const family = famalies.find(
    (data) => customer?.familyHeadUuid === data.headUUid
  );

  // in db version we can just use populate and one req
  const familyMembers = customers.filter(
    (cus) => cus.familyHeadUuid === family?.headUUid
  );

  return (
    <div>
      <InboxContainer>
        <FamilyInfoContainer>
          <h3>{family?.headName}</h3>
          <p>{family?.phoneNumber}</p>
          <p>{family?.email}</p>
          <p>{family?.address}</p>
        </FamilyInfoContainer>
        {familyMembers.map((data) => {
          return (
            <FamilyMemberContainer key={data.uuid}>
              <h3>{data.name}</h3>
              <p>{data.dob}</p>
              <p>{data.sex}</p>
              <p>Policen-Nr: XX.XX.XX.XX</p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                {data.products.map((pro) => {
                  if (pro === "spiatl") {
                    return (
                      <LocalHospitalIcon
                        key={pro}
                        style={{ color: "gray", fontSize: "6rem" }}
                      />
                    );
                  }
                  if (pro === "Kapital") {
                    return (
                      <SavingsIcon
                        key={pro}
                        style={{ color: "gray", fontSize: "6rem" }}
                      />
                    );
                  }
                  if (pro === "zahn") {
                    return (
                      <MasksIcon
                        key={pro}
                        style={{
                          color: "gray",
                          fontSize: "6rem",
                        }}
                      />
                    );
                  }
                  if (pro === "") {
                    return "";
                  }
                })}
              </div>
            </FamilyMemberContainer>
          );
        })}
      </InboxContainer>
    </div>
  );
};

export default CustomerFamilyInfo;
