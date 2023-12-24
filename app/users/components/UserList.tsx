"use client";

import { User } from "@prisma/client";
import UserListItem from "./UserListItem";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside
      className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-4">
          <div className="flex justify-between my-3 ">
            <div className="text-lg flex items-center font-bold text-neutral-800 pointer-events-none">
              Users
            </div>
        </div>
        {users.map((user) => (
          <UserListItem key={user.id} data={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
