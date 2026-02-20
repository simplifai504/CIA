import type { Metadata } from 'next';
import { Fira_Mono } from 'next/font/google';
import './globals.css';

const firaMono = Fira_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-fira-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Crypto Intelligence Agency',
  description: 'Uncovering the secrets of the blockchain, one transaction at a time',
  icons: { icon: '/icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaMono.variable}>
      <body className={`${firaMono.className} antialiased`}>{children}</body>
    </html>
  );
}
