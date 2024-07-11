import "./globals.css";

export const metadata = {
  title: "PSPDFKit Text Comparison Example",
  description: "A simple example of how to use PSPDFKit for text comparison",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
