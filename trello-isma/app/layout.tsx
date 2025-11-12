import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/f233a6bab6.js"
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className="antialiased bg-gray-800">{children}</body>
    </html>
  );
}
