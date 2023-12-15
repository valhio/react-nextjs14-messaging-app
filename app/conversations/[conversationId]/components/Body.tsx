"use client";

import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null); // This is the reference to the div that we want to scroll to when the component loads. We will use this reference in the useEffect to scroll to the bottom of the div when the component loads or when the messages change.
  const { conversationId } = useConversation();

  useEffect(() => {
    // This useEffect will run when the component loads or when the messages change. What it does is it updates the messages seen list in the database.
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
