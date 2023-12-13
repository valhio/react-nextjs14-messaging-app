"use client";

import { Conversation } from ".prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";

interface ConversationListItemProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleCLick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    // This is not created as a hook because we don't want it to be recreated on every render. We only want it to be created once and then reused on every render. This is because we don't want the useEffect to run on every render. A render is triggered by a state change. So if we don't memoize the function, the useEffect will run on every state change.
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false; // If there is no last message, return false. This is because if there is no last message, there is no way to know if the user has seen the last message or not. So we return false to indicate that the user has not seen the last message.

    const seenArray = lastMessage.seen || []; // The empty array is there in case the seen array is null. If the seen array is null, we want to use an empty array instead, otherwise we will get an error when we try to use the filter method on null/undefined.

    if (!userEmail) return false; // If there is no user email, return false. useSession might not have loaded yet, so we need to check if the user email exists before we try to use it.

    return seenArray.filter((user) => user.email === userEmail).length > 0; // If the user email is in the seen array, return true. If not, return false.
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleCLick}
      className={clsx(
        "w-full relative flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-3 cursor-pointer transition duration-200 ease-in-out",
        selected ? "bg-gray-100" : "bg:white"
      )}>
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p className={clsx(
            'text-xs truncate',
            hasSeen ? 'font-normal text-gray-500' : 'text-black font-bold'
          )}
          >{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
