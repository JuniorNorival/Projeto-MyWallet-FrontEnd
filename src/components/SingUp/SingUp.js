import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
function SingUp() {
  const [form, setForm] = useState({});

  function handleForm({ name, value }) {
    setForm({ ...form, [name]: value });
  }
  function sendForm(e) {
    e.preventDefault();
    const body = form;
    /* setForm({}); */
    const promise = axios.post(`https://localhost:5000/login`, body);
    promise.then();
  }
  return (
    <Container>
      <Form onSubmit={(e) => sendForm(e)}>
        <Input
          placeholder="Nome"
          name="name"
          required
          type="name"
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          name="Email"
          required
          type="email"
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
        <Input
          placeholder="Senha"
          name="password"
          required
          type="password"
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: "Saira Stencil One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
  }
  p {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: 20px 25px;

  button {
    width: 90vw;
    height: 46px;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    margin: 15px;
  }
`;
const Input = styled.input`
  width: 90vw;
  height: 58px;
  background: #ffffff;
  border-radius: 5px;
  outline: none;
  border: none;
  margin-top: 13px;
`;
export default SingUp;
