import type { Metadata } from "next";
import "../css/normalize.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../fonts/neodgm_code.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "yeonggi's script",
  description: "yeonggi's shell script in web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <body
        style={{
          backgroundColor: "black",
          padding: "0.4rem",
          color: "#d2d2d2",
        }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
