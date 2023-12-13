import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => { // This is a custom hook that we are going to use to get the conversation id from the URL
    const params = useParams(); // Get the params from the URL

    const conversationId = useMemo(() => { // What useMemo does is it will only run the function if the value of the dependency changes
        if (params?.conversationId) return '';

        return params.conversationId as string;
    }, [params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]); // !! is a double negation, which converts a value to a boolean

    return useMemo(() => ({ // Return an object with the values we want to use
        isOpen,
        conversationId,
    }), [isOpen, conversationId]);
}

export default useConversation;