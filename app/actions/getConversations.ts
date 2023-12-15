import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getConversations() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        // return new NextResponse('Unauthorized', { status: 401 });
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true, // the author of the message
                        seen: true // an array of users who have seen the message
                    }
                }
            }
        });

        return conversations;

    } catch (error: any) {
        return [];
    }

}