"use client";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

export default function Input() {
  const [inputData, setInputData] = useState("");
  return (
    <Container>
      {`> `}
      <InputContainer>{inputData}</InputContainer>
      <Cursor />
      <HiddenInput autoFocus onChange={(e) => setInputData(e.target.value)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
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
  background-color: white;
  animation: ${keyframes`
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    `} 1s infinite;
`;
