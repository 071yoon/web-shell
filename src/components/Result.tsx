import styled from "@emotion/styled";
import ConvertMarkdown from "./ConvertMarkdown";

export default function Result({ result }: { result: string }) {
  return (
    <ResultContainer>
      <ConvertMarkdown result={result} />
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
