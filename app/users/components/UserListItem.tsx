import { User } from "@prisma/client";
import UserList from "./UserList";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "../../components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

interface UserListItemProps {
  data: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    // useCallback is a hook that memoizes the function so that it is not recreated on every render. What that means is that the function is only created once and then reused on every render. This is important because if we don't do this, the function will be recreated on every render and the useEffect will run on every render. This will cause an infinite loop. A render is triggered by a state change. So if we don't memoize the function, the useEffect will run on every state change.
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id, // The user id of the user we want to start a conversation with
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`); // Redirect to the conversation page
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, data]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className=" w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-gray-100 rounded-lg transition cursor-pointer">
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900 truncate">
            {data.name}
          </div>
          <div className="text-sm text-gray-500 truncate">{data.email}</div>
        </div>
        <div className="flex-shrink-0">
          <svg
            className="h-4 w-4 text-gray-400 transform rotate-[270deg]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M6.293 5.293a1 1 0 011.414 0L12 9.586l4.293-4.293a1 1 0 111.414 
             1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />            
          </svg>
        </div>
      </div>
    </>
  );
};

export default UserListItem;
