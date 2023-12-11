import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing parameters', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({ // Create user in database with prisma client (ORM) 
            data: {
                email: email,
                name,
                hashedPassword: hashedPassword
            }
        });

        return NextResponse.json(user, { status: 201 }); // 201 = Created
    } catch (error) {
        // console.log(error);
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse('Something went wrong', { status: 500 });
    }
}