import getCurrentUser from '@/app/actions/getCurrentUser';
import { tr } from 'date-fns/locale';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

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

        if (!conversation) return new NextResponse('Not Found', { status: 404 });

        // Check if the current user is in the conversation
        const isUserInConversation = conversation.users.find(user => user.id === currentUser.id);
        if (!isUserInConversation) return new NextResponse('Unauthorized', { status: 401 });

        // Delete the conversation
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: { // Check if the current user is in the conversation before deleting it
                    hasSome: [currentUser.id] // If the current user is in the conversation, delete it
                }
            }
        });

        return NextResponse.json(deletedConversation, { status: 200 });
    } catch (error: any) {
        console.log(error, 'ERROR_CONVERSATION_DELETE');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}