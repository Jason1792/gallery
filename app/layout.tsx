import ScrollbarShiftFix from "./scrollbar-shift-fix";
import "../src/index.css";
import "../src/App.css";
import "../src/Header.css";
import "../src/ImageModal.css";
import "../src/Card.css";
import "../src/variables.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
  <ScrollbarShiftFix />
      <body>{children}</body>
    </html>
  );
}