import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoExitOutline,
} from "react-icons/io5";

function Wallet() {
  const token = JSON.parse(localStorage.getItem("mywallet"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [entry, setEntry] = useState({ name: "" });
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(`http://localhost:5000/wallet`, config);
    promise.then((res) => {
      setEntry(res.data);
    });
    // eslint-disable-next-line
  }, [refresh]);

  function deleteRecord(id) {
    const confirm = window.confirm("Deseja Excluir ?");
    if (!confirm) {
      return;
    }
    const promise = axios.delete(`http://localhost:5000/wallet/${id}`, config);
    promise
      .then((res) => setRefresh(!refresh))
      .catch(() => alert("Erro ao Excluir"));
  }
  const total = entry.records
    ?.map((item) => item.value)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  console.log(entry);
  return (
    <Container>
      <Header>
        <h1>Ola, {entry.name}</h1>
        <IoExitOutline
          color="#ffffff"
          fontSize="25px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("mywallet");
            const loggout = window.confirm("Deseja sair ?");
            if (!loggout) return;
            navigate("/");
          }}
        />
      </Header>
      <Records>
        {entry.records
          ? entry.records.map((rec, index) => (
              <div key={index}>
                <p>
                  <span>{rec.date}-</span>
                  {rec.description}
                </p>
                <p>
                  <Values color={rec.value}>
                    {Math.abs(rec.value).toFixed(2)}
                    <span onClick={() => deleteRecord(rec._id)}> x</span>
                  </Values>
                </p>
              </div>
            ))
          : ""}
        <Total>
          <p>SALDO</p>
          <Values color={total}>{total}</Values>
        </Total>
      </Records>
      <Footer>
        <div onClick={() => navigate("/newinn")}>
          <span>
            <IoAddCircleOutline color="#ffffff" fontSize="25px" />
          </span>
          <p>
            Nova <br /> Entrada
          </p>
        </div>
        <div onClick={() => navigate("/newout")}>
          <span>
            <IoRemoveCircleOutline color="#ffffff" fontSize="25px" />
          </span>
          <p>
            Nova <br /> Sa??da
          </p>
        </div>
      </Footer>
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

const Records = styled.div`
  width: 90vw;
  height: 446px;
  background: #ffffff;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  overflow-y: scroll;
  div {
    display: flex;
    justify-content: space-between;
  }
  p {
    margin: 25px 12px 0 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
  span {
    color: #c6c6c6;
  }
`;

const Footer = styled.div`
  display: flex;
  width: 90vw;
  margin: 25px auto;
  justify-content: space-between;
  div {
    width: 155px;
    height: 114px;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    position: relative;
    cursor: pointer;
    span {
      position: absolute;
      top: 5px;
      left: 5px;
    }
    p {
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
      color: #ffffff;
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
  }
`;

const Values = styled.div`
  margin: 25px 12px 0 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => (props.color < 0 ? "#C70000" : "#03AC00")};
  span {
    cursor: pointer;
    margin-left: 5px;
  }
`;
const Total = styled.div`
  position: absolute;
  bottom: calc(100% - 450px);
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 88vw;
  background-color: #ffffff;
  z-index: 1;
  padding-bottom: 25px;
  p {
    padding-bottom: 10px;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }
`;
export default Wallet;
