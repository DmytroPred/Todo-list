'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Layout from './components/layout/Layout';
import { AuthContextProvider } from './store/auth-context';
import { TaskContextProvider } from './store/task-context';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
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
          <TaskContextProvider>
            <Layout>{children}</Layout>
          </TaskContextProvider>
        </AuthContextProvider>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
