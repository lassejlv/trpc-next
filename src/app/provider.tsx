'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc } from '@/server//client';
import { httpBatchLink } from '@trpc/client';

export default function ReactQueryProivder({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(() => new QueryClient());
   const [trpcClient] = useState(
      trpc.createClient({
         links: [
            httpBatchLink({
               url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
            }),
         ],
      })
   );

   return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </trpc.Provider>
   );
}
