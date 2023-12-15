"use client";

import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Message } from "@prisma/client";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "text-white bg-blue-500" : "text-gray-700 bg-gray-100",
    data.image ? "rounded-md p-0 bg-gray-100" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              src={data.image}
              width={200}
              height={200}
              className="rounded-md object-cover cursor-pointer hover:scale-110 transition duration-200 ease-in-out translate"
              alt="Image"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && (
          <div className="text-xs text-gray-400 truncate">
            {seenList.length > 0 ? `Seen by ${seenList}` : "Sent"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
