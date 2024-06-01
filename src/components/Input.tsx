"use client";
import styled from "@emotion/styled";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { inputHandler, tabHandler } from "../terminal/inputHandler";

export default function Input({
  setResult,
  result,
}: {
  setResult: (result: string) => void;
  result: string;
}) {
  const [inputData, setInputData] = useState("");
  const [cursorIndex, setCursorIndex] = useState(0);
  const [searched, setSearched] = useState<string[]>([]);

  // scroll to bottom when ever result triggers
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [result]);

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearched([]);
      inputHandler({
        inputData,
        inputCallback: setResult,
        result,
      });
      setInputData("");
    }

    if (e.key === "ArrowLeft") {
      setCursorIndex((prev) => Math.max(0, prev - 1));
    }

    if (e.key === "ArrowRight") {
      setCursorIndex((prev) => Math.min(inputData.length, prev + 1));
    }

    if (e.key === "Tab") {
      e.preventDefault();
      tabHandler({
        inputData,
        inputCallback: setInputData,
        setCursorIndex,
        setSearched,
      });
    }
  };

  return (
    <>
      <Container htmlFor="hiddenInput">
        {`> `}
        <InputContainer>
          {Array.from(inputData).map((singleInput, index) => {
            if (index === cursorIndex) {
              return (
                <Cursor key={Symbol(index).toString()}>
                  <p>{singleInput}</p>
                </Cursor>
              );
            }
            return <p key={Symbol(index).toString()}>{singleInput}</p>;
          })}
          {(cursorIndex === inputData.length || inputData.length === 0) && (
            <Cursor />
          )}
        </InputContainer>
      </Container>
      <SearchContainer>
        {searched.map((search) => (
          <p key={search}>{search}</p>
        ))}
      </SearchContainer>
      <HiddenInput
        autoFocus
        id="hiddenInput"
        value={inputData}
        autoComplete="off"
        onChange={(e) => {
          setInputData(e.target.value);
          setCursorIndex(e.target.selectionStart || 0);
        }}
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
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
`;

const HiddenInput = styled.input`
  opacity: 0;
`;

const Cursor = styled.div`
  width: 0.5rem;
  height: 1rem;
  background-color: #f0aa26;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
