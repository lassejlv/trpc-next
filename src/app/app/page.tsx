"use client";

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { trpc } from '@/server/client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function Page() {
  const session = trpc.auth.session.useQuery();

  const updateProfile = trpc.profile.update.useMutation({
    onSuccess() {
      toast.success('Profile updated');
      session.refetch();
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  const router = useRouter()


  if (session.isLoading) return <div>Loading...</div>
  if (!session.data) return router.push('/login');
  
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries());
    const publicProfile = values.publicProfile === 'on';

    updateProfile.mutate({ publicProfile });
    
  }
  
  return (
    <div>
      <h1 className='text-2xl font-bold'>Welcome {session.data.name}!</h1>

      <form className='mt-4' onSubmit={submit}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='publicProfile'>Public Profile</Label>
          <Switch id="publicProfile" name="publicProfile" defaultChecked={session.data.public} disabled={updateProfile.isPending}  />
        </div>

        <Button type='submit' className='mt-4' disabled={updateProfile.isPending}>
          {updateProfile.isPending ? <Spinner /> : 'Update'}
        </Button>
      </form>
    </div>
  )
}
