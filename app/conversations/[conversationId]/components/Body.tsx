"use client";

import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

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

  useEffect(() => {
    pusherClient.subscribe(conversationId); // Subscribe to the conversation channel in Pusher.
    bottomRef.current?.scrollIntoView(); // Scroll to the bottom of the div when the component loads or when the messages change.

    const messageHandler = (message: FullMessageType) => {
      // This is the function that will run when a new message is received from pusher. It has one parameter which is the new message. We will use this function to update the messages state.
      axios.post(`/api/conversations/${conversationId}/seen`); // Update the messages seen list in the database. (When a User loads the conversation, we will mark the last message as seen by that User.)

      setMessages((current) => {
        // setMessages has a callback function that receives the current messages.
        if (find(current, { id: message.id })) {
          // If the message already exists in the current messages, we will return the current messages. Checks if current messages has a message with the same id as the new message.
          return current;
        }

        return [...current, message]; // If the message does not exist in the current messages, we will return the current messages with the new message appended to the end.
      });

      bottomRef.current?.scrollIntoView(); // Scroll to the bottom of the div when a new message is received.
    };

    const updateMessageHandler = (newMessage: FullMessageType) => { // This is the function that will run when a message is updated from pusher. It takes one parameter which is the new message. We will use this function to update the messages state.
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) { // If we find a message in the current messages with the same id as the new message, we will update/replace it with the new message.
            return newMessage;
          }
          return currentMessage; // If we don't find a message in the current messages with the same id as the new message, we will return the current message.
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler); // What this does is it listens for new messages in the conversation channel. When a new message is received, it will call the messageHandler function.
    pusherClient.bind("message:update", updateMessageHandler); // What this does is it listens for a message update in the conversation channel. When a message is updated, it will call the updateMessageHandler function.

    return () => {
      // This is the cleanup function. It will run when the component unmounts.
      pusherClient.unsubscribe(conversationId); // Unsubscribe from the conversation channel in Pusher.
      pusherClient.unbind("messages:new", messageHandler); // Unbind the messageHandler function from the messages:new event. This is to prevent memory leaks.
      pusherClient.unbind("message:update", updateMessageHandler); // Unbind the updateMessageHandler function from the messages:update event. This is to prevent memory leaks.
    };
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
