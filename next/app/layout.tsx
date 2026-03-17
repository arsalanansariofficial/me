import type { Metadata } from 'next';
import { Outfit as FontSans } from 'next/font/google';

import { cn } from '@/_lib/utils';

import '@/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Resume Portfolio | Arsalan Ansari',
  description: 'Created by Arsalan Ansari'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen gap-4 space-y-4 bg-smoky-black p-4 font-sans antialiased md:space-y-8 md:p-16 lg:grid lg:grid-flow-col lg:grid-cols-[15em_1fr] lg:gap-4 lg:space-y-0 lg:p-4',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
