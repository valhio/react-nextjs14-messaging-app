"use client";

import { signOut } from "next-auth/react";

const Users = () => {
  return (
    <div className="p-4 flex justify-between">
      <h1>Users</h1>
      <button
        onClick={() => signOut()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Sign Out
      </button>
    </div>
  );
};

export default Users;
