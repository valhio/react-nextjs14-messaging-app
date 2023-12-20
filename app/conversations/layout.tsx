import { Conversation } from "@prisma/client";
import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations(); // getConversations returns an array of Conversation, including messages[] and users[]
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
