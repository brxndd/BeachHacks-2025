import "./globals.css";
import { League_Spartan } from 'next/font/google';

// Load the League Spartan font
const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Specify the weights you need
  variable: '--font-league-spartan', // Optional: Define a CSS variable
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable}`}>
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  );
}
