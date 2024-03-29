"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationListItem from "./ConversationListItem";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find, update } from "lodash";
interface ConversationListProps {
  initialItems: FullConversationType[]; // Called initialItems because the conversations data will be updated in real time
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    // This is the Pusher key that we will use to subscribe to the conversation channel.
    return session.data?.user?.email; // We will use the User's email as the Pusher key.
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey); // Subscribe to the conversation channel in Pusher.

    const newHandler = (newConversation: FullConversationType) => {
      setItems((current) => {
        // Update the conversations state with the new conversation.
        if (find(current, { id: conversationId })) {
          // If the conversation already exists in the current conversations, we will return the current conversations. Checks if current conversations has a conversation with the same id as the new conversation.
          return current;
        }
        return [...current, newConversation]; // If the conversation does not exist in the current conversations, we will return the current conversations with the new conversation appended to the end.
      });
      // setItems(() => { // This works too, without using lodash's find function. The reason why we used lodash's find function is because it is more optimized (supposedly)
      //   const exists = items.find((item) => item.id === newConversation.id);
      //   if (exists) return items;
      //   return [...items, newConversation];
      // });
    };

    const updateHandler = (newConversation: FullConversationType) => {
      setItems((current) =>
        current.map((item) => {
          // Update the conversations state with the updated conversation.
          if (item.id === newConversation.id) {
            // If we find a conversation in the current conversations with the same id as the new conversation, we will update/replace it with the new conversation.
            return {
              // We are going to update the conversation's messages property with the new conversation's messages property, so that we can update the new message's preview, in the conversation list, in real time.
              ...item,
              messages: newConversation.messages,
            };
          }
          return item;
        })
      );
    };

    const removeHandler = (deletedConversation: FullConversationType) => {
      setItems((current) => {
        return [
          ...current.filter(
            (conversation) => conversation.id !== deletedConversation.id
          ),
        ];
      });

      if (conversationId === deletedConversation.id) {
        // If the conversation that was deleted is the conversation that is currently open (has the same id as the conversationId in the URL), we will redirect the User to the conversations page.
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey); // Unsubscribe to the conversation channel in Pusher.
      pusherClient.unbind("conversation:new", newHandler); // Unbind the newHandler function from the conversation channel.
      pusherClient.unbind("conversation:update", updateHandler); // Unbind the updateHandler function from the conversation channel.
      pusherClient.unbind("conversation:remove", removeHandler); // Unbind the removeHandler function from the conversation channel.
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-16 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}>
        <div className="px-4">
          <div className="flex justify-between my-3 ">
            <div className="text-lg flex items-center font-bold text-neutral-800 pointer-events-none">
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition duration-200 ease-in-out">
              <MdOutlineGroupAdd size={18} />
            </div>
          </div>
          <div className="md:pt-2">
            {items.map((item) => (
              <ConversationListItem
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
