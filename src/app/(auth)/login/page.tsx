'use client';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/server/client';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'sonner';

export default function Page() {
   const router = useRouter();

   const login = trpc.auth.login.useMutation({
      onSuccess() {
         router.push('/app');
      },
      onError(error) {
         toast.error(error.message);
      },
   });

   const submit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const values = Object.fromEntries(formData.entries()) as { email: string; password: string };

      await login.mutateAsync(values);
   }

   return (
      <form className='flex flex-col gap-4' onSubmit={submit}>
         <div className='flex flex-col my-3'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' type='email' required />
         </div>
         <div className='flex flex-col my-3'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' type='password' required />
         </div>

         <Button type="submit" disabled={login.isPending}>
            {login.isPending ? <Spinner /> : 'Register'}
         </Button>
      </form>
   );
}
