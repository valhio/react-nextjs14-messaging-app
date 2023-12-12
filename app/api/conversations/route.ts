import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId, // user id of the person you are creating a conversation with
            isGroup, // boolean to indicate if this is a group conversation
            members, // If this is a group conversation, this is an array of user ids of the members we are adding to the group
            name, // If this is a group conversation, this is the name of the group
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({ // This is the conversation we are creating
                data: {
                    isGroup, // boolean to indicate if this is a group conversation
                    name, // If this is a group conversation, this is the name of the group
                    users: {
                        connect: [ // connect is used to connect the users to the conversation 
                            ...members.map((member: { value: string }) => ({ // map over the members array and return an array of objects with the user ids
                                id: member.value // the user id
                            })),
                            { id: currentUser.id } // add the current user to the conversation
                        ]
                    }
                },
                include: { // This is the data we want to include in the response (they are going to be used to update the UI)
                    users: true // include the users in the response
                }
            })

            return NextResponse.json(newConversation);
        } else { // If this is not a group conversation, create a conversation with just the current user and the user we are creating a conversation with

            const existingConversation = await prisma.conversation.findFirst({
                where: {
                    OR: [ 
                        {
                            userIds: {
                                equals: [userId, currentUser.id],
                            }
                        },
                        { // This is the same as the above but in reverse order for safety
                            userIds: {
                                equals: [currentUser.id, userId],
                            }
                        }
                    ]
                }
            });

            if (existingConversation) { // If a conversation already exists, return it
                return NextResponse.json(existingConversation);
            } else { // If a conversation does not exist, create it
                const newConversation = await prisma.conversation.create({
                    data: {
                        isGroup: false,
                        users: {
                            connect: [
                                { id: userId },
                                { id: currentUser.id }
                            ]
                        }
                    },
                    include: { // This is the data we want to include in the response 
                        users: true
                    }
                });
                return NextResponse.json(newConversation);
            }
        }


    } catch (error: any) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}