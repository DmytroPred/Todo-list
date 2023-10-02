'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Layout from './components/layout/Layout';
import AuthContext, {
  AuthContextProvider,
  AuthContextType,
} from './store/auth-context';
import { useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContextProvider>
          <Layout>{children}</Layout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
