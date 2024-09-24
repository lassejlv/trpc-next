import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import ReactQueryProivder from './provider';
import { Toaster } from 'sonner';
import './globals.css';

const pop = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
   title: 'TRPC is awesome 🚀',
   description: 'TRPC is awesome 🚀',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang='en'>
         <body className={`${pop.className} container mx-auto py-12`}>
            <ReactQueryProivder>
               <Toaster richColors />

               {children}
            </ReactQueryProivder>
         </body>
      </html>
   );
}
