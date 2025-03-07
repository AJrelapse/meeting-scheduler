import './globals.css';

export const metadata = {
  title: 'RocketAir Clone',
  description: 'A clone of the RocketAir website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}