import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(
    req: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { name, image } = body;

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: name,
                image: image
            }
        });

        return NextResponse.json(newUser, { status: 200 });
    } catch (error: any) {
        console.log(error, 'ERROR_SETTINGS');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}