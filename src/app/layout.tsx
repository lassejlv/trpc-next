import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryProivder from './provider';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

export const metadata: Metadata = {
   title: 'TRPC is awesome 🚀',
   description: 'TRPC is awesome 🚀',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang='en'>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ReactQueryProivder>{children}</ReactQueryProivder>
         </body>
      </html>
   );
}
