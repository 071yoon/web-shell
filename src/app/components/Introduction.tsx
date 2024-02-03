"use client";
import { useRef } from "react";
import AnimatingParagraph from "./AnimatingParagraph";

export default function Introduction() {
  const ref = useRef<HTMLParagraphElement>(null);

  return (
    <div>
      <AnimatingParagraph ref={ref}>
        {`Hi, I'm yeonggi. I'm a student in South Korea. 
        `}
        <br />
        {`
        I'm interested in shell scripting and web development. 
        I'm studying shell scripting and web development.
        `}
        <br />
        {`I'm studying shell scripting and web development.`}
      </AnimatingParagraph>
    </div>
  );
}
