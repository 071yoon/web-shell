"use client";
import styled from "@emotion/styled";
import { useState } from "react";
import { inputHandler } from "../terminal/inputHandler";

export default function Input({
  setResult,
  result,
}: {
  setResult: (result: string) => void;
  result: string;
}) {
  const [inputData, setInputData] = useState("");

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      inputHandler({ inputData, inputCallback: setResult, result });
      setInputData("");
    }
  };

  return (
    <>
      <Container htmlFor="hiddenInput">
        {`> `}
        <InputContainer>{inputData}</InputContainer>
        <Cursor />
      </Container>
      <HiddenInput
        autoFocus
        id="hiddenInput"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onKeyDown={handleOnKeyPress}
      />
    </>
  );
}

const Container = styled.label`
  display: flex;
  align-items: center;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  white-space: pre;

  cursor: text;
`;

const InputContainer = styled.div`
  border: none;
  color: white;
  background-color: transparent;
`;

const HiddenInput = styled.input`
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

const Cursor = styled.div`
  width: 0.5rem;
  height: 1rem;
  background-color: #f0aa26;
`;
