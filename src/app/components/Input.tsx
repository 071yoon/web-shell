"use client";
import styled from "@emotion/styled";
import { useState } from "react";

export default function Input() {
  const [inputData, setInputData] = useState("");
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
        onChange={(e) => setInputData(e.target.value)}
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
