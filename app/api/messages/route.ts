import getCurrentUser from "@/app/actions/getCurrentUser";
import { ca } from "date-fns/locale";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            message,
            image,
            conversationId
        } = body;

        if (!currentUser?.id || !currentUser?.email) return new NextResponse('Unauthorized', { status: 401 })

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image,
                conversation: { // Connect the message to the conversation
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: { // Add the current user (the sender) to the seen list of the message
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        })

        const updatedConversation = await prisma.conversation.update({ // Update the conversation to have the new message
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: { // Connect the new message to the conversation
                    connect: {
                        id: newMessage.id
                    }
                },
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        });

        await pusherServer.trigger(conversationId, 'messages:new', newMessage); // What this does is that it sends a message to the channel with the conversationId as the channel name, and the event name is messages:new, and the data is the new message. Every user that is subscribed to the channel will receive the message. (app/conversations/[conversationId]/components/Body.tsx has the code that subscribes to the channel using useEffect)

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]; // Get the last message of the conversation

        updatedConversation.users.map((user) => { // Loop through all the users in the conversation and send them the updated conversation
            pusherServer.trigger(user.email!, 'conversation:update', { // Send the updated conversation to all the users in the conversation.
                id: conversationId,
                messages: [lastMessage]
            }); 
        })

        return NextResponse.json(newMessage, { status: 200 });

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('InternalError', { status: 500 })

    }
}