import './styles/globals.css';

export const metadata = {
  title: 'Choose Your Own Adventure AI',
  description: 'A choose your own adventure game powered by AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
