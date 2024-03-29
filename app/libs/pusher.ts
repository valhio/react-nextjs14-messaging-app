import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'eu',
    useTLS: true, // TLS - Transport Layer Security - encrypts data sent over the internet
});

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        channelAuthorization:{ // This is used to authenticate the user with Pusher.
            endpoint: '/api/pusher/auth',
            transport: 'ajax',
        },
        cluster: 'eu', // The cluster to which the client should connect.
    }
);
