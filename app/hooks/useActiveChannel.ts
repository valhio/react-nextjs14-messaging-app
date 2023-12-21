import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

// This hook is used to keep track of the users who are currently active in the chat. 
const useActiveChannel = () => {
    const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel; // The channel to which the user is subscribing

    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger'); // Subscribe to the channel
      setActiveChannel(channel); // Set the channel
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => { // This event is triggered when the user successfully subscribes to the channel.
      const initialMembers: string[] = []; // The list of active users.

      members.each((member: Record<string, any>) => initialMembers.push(member.id)); // Add each member to the list. The member.id is the user's email address (this is set in pages/api/pusher/auth.ts in the data:{user_id: session.user.email} object).
      set(initialMembers); // Set the list of active users.
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => { // This event is triggered when a new user joins the channel.
      add(member.id) // Add the user to the list of active users. The member.id is the user's email address (this is set in pages/api/pusher/auth.ts in the data:{user_id: session.user.email} object).
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => { // This event is triggered when a user leaves the channel.
      remove(member.id); // Remove the user from the list of active users. The member.id is the user's email address (this is set in pages/api/pusher/auth.ts in the data:{user_id: session.user.email} object).
    });

    return () => { // This function is called when the component unmounts.
      if (activeChannel) { // If the user is subscribed to the channel, unsubscribe from it.
        pusherClient.unsubscribe('presence-messenger'); // Unsubscribe from the channel.
        setActiveChannel(null); // Set the channel to null.
      }
    }
  }, [activeChannel, set, add, remove]);
}

export default useActiveChannel;