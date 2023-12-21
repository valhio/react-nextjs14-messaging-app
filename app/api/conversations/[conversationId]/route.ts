import getCurrentUser from '@/app/actions/getCurrentUser';
import { tr } from 'date-fns/locale';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) return new NextResponse('Unauthorized', { status: 401 });

        // Find the existing conversation by its ID
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!conversation) return new NextResponse('Invalid ID', { status: 400 });

        // Delete the conversation
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: { // Check if the current user is in the conversation before deleting it
                    hasSome: [currentUser.id] // If the current user is in the conversation, delete it
                }
            }
        });

        conversation.users.forEach((user) => { // Loop over the users in the conversation and trigger a pusher event for each of them. Each user who is subscribed to the event and is listening to the channel, with the name of their email, will receive the deleted conversation
            if(user.email) {
                pusherServer.trigger(user.email!, 'conversation:remove', conversation); // Trigger the event to delete the conversation in the client side
            }
        });

        return NextResponse.json(deletedConversation, { status: 200 });
    } catch (error: any) {
        console.log(error, 'ERROR_CONVERSATION_DELETE');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}