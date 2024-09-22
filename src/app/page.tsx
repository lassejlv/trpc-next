'use client';

import { trpc } from '@/server/client';

export default function page() {
   const users = trpc.user.getUsers.useQuery();

   if (users.isLoading) return <div>Loading users...</div>;
   if (users.error) return <div>Error loading users: {users.error.message}</div>;

   return (
      <div>
         {users.data?.map((user) => (
            <div key={user.id}>
               <h2>{user.name}</h2>
               <p>{user.email}</p>
               <p>Created at: {user.createdAt}</p>
               <p>Updated at: {user.updatedAt}</p>
            </div>
         ))}
      </div>
   );
}
