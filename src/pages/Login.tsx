import React, { useState } from "react";
import styled from "styled-components";
import { useTypedActions } from "../hooks/useTypedActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { login } from "../redux/action-creators/loginActions";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &::disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const { allEmployees } = useTypedSelector((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = useTypedActions(login);
  const history = useHistory();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please input email and password");
    }

    const empExist = allEmployees.allEmployeesData?.map(
      (emp) => emp.email === email
    );

    if (empExist && empExist?.length < 0) {
      console.log(empExist);
      return alert("wrong email or password");
    } else {
      loginFunc({ email, password });
      history.push("/inbox");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={(e) => handleLogin(e)}>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
