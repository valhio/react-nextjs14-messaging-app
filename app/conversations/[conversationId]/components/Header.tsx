"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import GroupAvatar from "@/app/components/GroupAvatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      // If the conversation is a group chat, return the number of members as the status text
      return `${conversation.users.length} members`;
    }

    //TODO: Implement the status text for a one-to-one conversation to be dynamic
    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-gray-500 hover:text-gray-700">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <GroupAvatar users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-lign text-gray-500">{statusText}</div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer transition duration-200 ease-in-out"
        />
      </div>
    </>
  );
};

export default Header;
