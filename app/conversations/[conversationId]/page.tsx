import getConeversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ConversationIdPage = async ({ params }: { params: IParams }) => {
  const conversationId = params.conversationId;
  const conversation = await getConeversationById(conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState
            title="No Conversation Found"
            description="Please check the conversation id and try again."
            icon="error"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages}/>
        <Form />
      </div>
    </div>
  );
};

export default ConversationIdPage;
