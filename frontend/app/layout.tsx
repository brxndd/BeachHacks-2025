import "./globals.css";
import { League_Spartan } from 'next/font/google';
import { Providers } from './providers'; // Import the Session Provider

// Load the League Spartan font
const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-league-spartan',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable}`}>
      <body className={leagueSpartan.className}>
        <Providers> {/* Wrap children with Session Provider */}
          {children}
        </Providers>
      </body>
    </html>
  );
}