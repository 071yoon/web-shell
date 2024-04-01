"use client";
import { useState } from "react";
import Input from "../components/Input";
import Introduction from "../components/Introduction";
import Result from "../components/Result";

export default function Home() {
  const [result, setResult] = useState<string>("");
  return (
    <>
      <Introduction />
      <Result result={result} />
      <Input setResult={setResult} result={result} />
    </>
  );
}
