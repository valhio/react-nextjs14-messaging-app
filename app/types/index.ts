import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & { 
    sender: User,
    seen: User[],
}

export type FullConversationType = Conversation & { // This type represents a conversation along with its messages and users
    messages: FullMessageType[],
    users: User[],
}