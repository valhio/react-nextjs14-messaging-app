import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import { HiChat, HiLogout, HiUsers } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

const useRoutes = () => {
    const pathName = usePathname();
    const { conversationId } = useConversation(); // Get the conversationId from the useConversation hook

    const routes = useMemo(() => [ // What useMemo does is it will only run the function if the value of the dependency changes
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathName === '/conversations' || !!conversationId, // !! is a double negation, which converts a value to a boolean
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathName === '/users',
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
        },
    ], [pathName, conversationId]);

    return routes;
}

export default useRoutes;