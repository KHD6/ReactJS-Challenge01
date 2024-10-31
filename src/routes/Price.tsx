import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

const InputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 10px 0px;
  gap: 10px;
  label {
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => props.theme.textColor};
  }
  input {
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    padding: 7px 0px;
    border-radius: 10px;
  }
`;

const BtnBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Btn = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
interface ChartProps {
  coinId: string;
  USDPrice: any;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId, USDPrice }: ChartProps) {
  const [amount, setAmount] = useState(0);
  const [inverted, setinverted] = useState(true);
  const onChange = (event: any) => {
    setAmount(event.target.value);
  };
  const reset = () => {
    setAmount(0);
  };
  const onFlip = () => {
    reset();
    setinverted((current) => !current);
  };

  return (
    <>
      <InputBox>
        <label htmlFor="hours">{coinId}</label>
        <input
          value={inverted ? amount : (amount / USDPrice).toFixed(3)}
          id={coinId}
          placeholder={coinId}
          type="number"
          onChange={onChange}
          disabled={!inverted}
        />
      </InputBox>
      <InputBox>
        <label htmlFor="minutes">USD</label>
        <input
          value={inverted ? (amount * USDPrice).toFixed(2) : amount}
          id="USD"
          placeholder="USD"
          type="number"
          onChange={onChange}
          disabled={inverted}
        />
      </InputBox>

      <BtnBox>
        <Btn onClick={reset}>Reset</Btn>
        <Btn onClick={onFlip}>{inverted ? "Turn back" : "Flip"}</Btn>
      </BtnBox>
    </>
  );
}

export default Price;
