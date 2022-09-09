import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewInn() {
  const [form, setForm] = useState({ value: "", description: "" });
  const token = JSON.parse(localStorage.getItem("mywallet"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const navigate = useNavigate();
  console.log(config);
  function handleForm({ name, value }) {
    setForm({ ...form, [name]: value });
  }
  function sendForm(e) {
    e.preventDefault();
    const body = form;
    const promise = axios.post(`http://localhost:5000/wallet`, body, config);
    promise
      .then(() => {
        navigate("/wallet");
      })
      .catch((res) => {
        console.log(res);
        setForm({ value: "", description: "" });
      });
  }
  console.log(form);
  return (
    <Container>
      <Header>
        <h1>Nova Entrada</h1>
      </Header>

      <Form onSubmit={(e) => sendForm(e)}>
        <Input
          placeholder="Valor"
          name="value"
          required
          type="number"
          value={form.value}
          onChange={(e) =>
            handleForm({ name: e.target.name, value: Number(e.target.value) })
          }
        />
        <Input
          placeholder="Descrição"
          name="description"
          required
          type="text"
          value={form.description}
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
        <button type="submit">Salvar Entrada</button>
      </Form>
    </Container>
  );
}
const Container = styled.div`
  background-color: #8c11be;
  height: 100vh;
  width: 100vw;
`;
const Header = styled.div`
  width: 90vw;
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;

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
    cursor: pointer;
  }
  p {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: red;
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
export default NewInn;
