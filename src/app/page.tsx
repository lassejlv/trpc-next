'use client';

export default function page() {
   const users: any[] = [];

   return (
      <div>
         {users.map((user) => (
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
