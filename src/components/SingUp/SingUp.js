import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SingUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  function handleForm({ name, value }) {
    setForm({ ...form, [name]: value });
  }
  function sendForm(e) {
    e.preventDefault();
    const body = form;
    /* setForm({}); */
    const promise = axios.post(`http://localhost:5000/singup`, body);
    promise.then(() => navigate("/")).catch((res) => console.log(res));
  }
  return (
    <Container>
      <h1>My Wallet</h1>
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
          name="email"
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
        <Input
          placeholder="Confirme a senha"
          name="password"
          required
          type="password"
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
        <button type="submit">Cadastrar</button>
      </Form>
      <Link to="/">
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
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
  ::placeholder {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    padding: 15px;
  }
`;
export default SingUp;
