import styled from "@emotion/styled";

export default function Result({ result }: { result: string }) {
  return (
    <ResultContainer>
      {result.split("\n").map((line, index) => {
        return <p key={index}>{line}</p>;
      })}
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  white-space: pre-line;

  p {
    margin: 0;
    white-space: pre;
  }
`;
