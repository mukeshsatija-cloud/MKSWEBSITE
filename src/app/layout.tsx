import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Auth0Provider } from '@auth0/nextjs-auth0';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Newspaper Supply Portal',
  description: 'Manage newspaper distributions and supply requests',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <Auth0Provider>
        <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased h-full`}>
          {children}
        </body>
      </Auth0Provider>
    </html>
  );
}
