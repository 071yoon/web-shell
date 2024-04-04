import Markdown from "markdown-to-jsx";

const CustomLink = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a
      {...props}
      style={{ color: "#c7c7c7" }}
      onClick={(e) => {
        e.preventDefault();
        window.open(props.href, "_blank");
      }}
    >
      {children}
    </a>
  );
};

const CustomStrong = ({ children }: { children: React.ReactNode }) => {
  return (
    <strong style={{ color: "#d7f6ff", fontWeight: 800 }}>{children}</strong>
  );
};

const CustomCode = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const CustomUl = ({ children }: { children: React.ReactNode }) => {
  return <ul style={{ margin: "0" }}>{children}</ul>;
};

export default function ConvertMarkdown({ result }: { result: string }) {
  return (
    <Markdown
      options={{
        overrides: {
          a: {
            component: CustomLink,
          },
          strong: {
            component: CustomStrong,
          },
          code: {
            component: CustomCode,
          },
          ul: {
            component: CustomUl,
          },
        },
        namedCodesToUnicode: {
          eq: "=",
          ba: "-",
          st: "*",
        },
      }}
    >
      {result}
    </Markdown>
  );
}
