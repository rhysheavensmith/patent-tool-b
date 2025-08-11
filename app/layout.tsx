import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP Guardian Questionnaire",
  description: "IP Guardian Questionnaire Application",
  keywords: "IP, Intellectual Property, Questionnaire, IP Guardian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='h-screen'>
        {children}
      </body>
    </html>
  );
}
