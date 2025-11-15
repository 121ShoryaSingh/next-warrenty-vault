import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WarrantyVault',
  description:
    'Warranty Receipt Vault is a modern full-stack application designed to help users effortlessly manage, store, and retrieve warranty receipts for products they own. By implementing this solution, users can securely upload digital receipts, attach warranty information, and organize their documents for future reference.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased `}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
