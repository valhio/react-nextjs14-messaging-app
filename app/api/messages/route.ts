import getCurrentUser from "@/app/actions/getCurrentUser";
import { ca } from "date-fns/locale";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


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

        return NextResponse.json(newMessage, { status: 200 });

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('InternalError', { status: 500 })

    }
}