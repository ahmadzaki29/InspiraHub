import React from 'react';
import { AuthContextProvider } from '@/context/AuthContext';
import { Inter } from 'next/font/google';
import './globals.css';

// Load the Inter font with 'latin' subset
const inter = Inter( { subsets: [ 'latin' ] } );

// Metadata for the application
export const metadata = {
  title: 'Next.js + Firebase Starter',
  description: 'Template to use Next.js with Firebase',
};

// Root layout component for the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
