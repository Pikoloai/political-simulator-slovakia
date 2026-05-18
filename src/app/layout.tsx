import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Slovenský Politický Simulátor',
  description: 'Realistická politická simulácia - vláda, parlament, diplomacia, voľby',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body className={`${inter.className} bg-slate-900`}>
        {children}
      </body>
    </html>
  );
}
