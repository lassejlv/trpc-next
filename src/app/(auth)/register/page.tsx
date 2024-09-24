'use client';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/server/client';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { toast } from 'sonner';

export default function Page() {
   const router = useRouter();

   const register = trpc.auth.register.useMutation({
      onSuccess() {
         toast.success('Registered successfully');
         router.push('/login');
      },
      onError(error) {
         toast.error(error.message);
      },
   });

   const submit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const values = Object.fromEntries(formData.entries()) as { name: string; email: string; password: string };

      await register.mutateAsync(values);
   }

   return (
      <form className='flex flex-col gap-4' onSubmit={submit}>
         <div className='flex flex-col my-3'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name' type='text' required />
         </div>
         <div className='flex flex-col my-3'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' type='email' required />
         </div>
         <div className='flex flex-col my-3'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' type='password' required />
         </div>

         <Button type="submit" disabled={register.isPending}>
            {register.isPending ? <Spinner /> : 'Register'}
         </Button>
      </form>
   );
}
