import "./globals.css";

export const metadata = {
  title: "ViennaUP Event Map",
  description: "Interactive map of ViennaUP programme events"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
