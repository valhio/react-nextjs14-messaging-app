import getCurrentUser from "@/app/actions/getCurrentUser";
import { ca } from "date-fns/locale";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if(!currentUser?.id || !currentUser?.email) return new NextResponse('Unauthorized', { status: 401 })

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

        if(!conversation) return new NextResponse('Not Found', { status: 404 })

        // Find the last message in the conversation
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if(!lastMessage) return NextResponse.json(conversation, { status: 200 });

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

        return NextResponse.json(updatedMessage, { status: 200 });

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SEEN');
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}