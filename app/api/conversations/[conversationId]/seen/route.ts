import getCurrentUser from "@/app/actions/getCurrentUser";
import { ca } from "date-fns/locale";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId: string;
}

export async function POST( // This function adds the current user to the seen list of the last message in the conversation
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) return new NextResponse('Unauthorized', { status: 401 })

    // Find the existing conversation by its ID
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    if (!conversation) return new NextResponse('Not Found', { status: 404 })

    // Find the last message in the conversation
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation, { status: 200 });

    // Update the seen list of the last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    await pusherServer.trigger(currentUser.email, 'conversation:update', { // Trigger the event to update the conversation in the client side. This will update the seen list of the last message in the conversation.
      id: conversation.id,
      messages: [updatedMessage]
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) === -1) { // If the current user is not in the seen list of the last message, add them to the seen list
      await pusherServer.trigger(conversationId!, 'message:update', updatedMessage); // Trigger the event to update the message in the client side. This will update the seen list of the last message in the conversation. Every user in the conversation(subscriber) will be notified that the current user has seen the last message.
    }

    return NextResponse.json(updatedMessage, { status: 200 });
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}