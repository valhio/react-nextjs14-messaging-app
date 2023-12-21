
// This file is responsible for authenticating the user with Pusher.
// It is called when the user first loads the page.

import { pusherServer } from "@/app/libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

// It is used to display the user's active status to other users.
export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const session = await getServerSession(request, response, authOptions);

    if (!session?.user?.email) {
        return response.status(403).send("Forbidden");
    }

    const socketId = request.body.socket_id;
    const channel = request.body.channel_name; // The channel to which the user is subscribing.
    const data = { // The data that will be sent to Pusher.
        user_id: session.user.email
    }

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data); // Authorize the user with Pusher.

    return response.send(authResponse); 
}