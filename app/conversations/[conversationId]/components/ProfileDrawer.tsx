"Use client";

import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { IoAdd, IoClose, IoCloseSharp, IoTrash } from "react-icons/io5";
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const joinedDate = useMemo(() => {
    if (!otherUser.createdAt) return null;
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.isGroup ? data.name : otherUser.name;
  }, [data, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          static
          // className="realtive z-50"
          className="fixed z-50 inset-0 overflow-hidden"
          onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-gray-500"
                            onClick={onClose}>
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} />
                            {/* Heroicon name: outline/x
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg> */}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-gray-200 border-dashed"
                          aria-hidden="true">
                          <div className="flex flex-col justify-center items-center h-full">
                            <div className="flex flex-col items-center">
                              <div className="flex-shrink-0">
                                <Avatar user={otherUser} />
                              </div>
                              <div className="mt-4">
                                <span className="text-sm font-medium text-gray-900">
                                  {otherUser.name}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">
                                  {statusText}
                                </span>
                              </div>
                              <hr className="mt-2 w-full" />
                              {!data.isGroup && (
                                <div className="mt-2">
                                  <span className="text-sm text-gray-500">
                                    {otherUser.email}
                                  </span>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Joined {joinedDate}
                                  </span>
                                </div>
                              )}
                              <hr className="mt-2 w-full" />
                              <div className="mt-4 flex flex-col gap-2">
                                <div
                                  onClick={() => setConfirmOpen(true)}
                                  className="flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out">
                                  <IoTrash size={22} />
                                  <span className="text-sm">Delete chat</span>
                                </div>
                                {data.isGroup && (
                                  <div className="flex justify-center items-center gap-2 px-4 py-2 rounded-md text-center bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out">
                                    <IoCloseSharp size={22} />
                                    <span className="text-sm">Leave group</span>
                                  </div>
                                )}
                                {!data.isGroup && (
                                  <div className="flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out">
                                    <IoCloseSharp size={22} />
                                    <span className="text-sm">
                                      Leave conversation
                                    </span>
                                  </div>
                                )}
                                {data.isGroup && (
                                  <div className="flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out">
                                    <IoAdd size={22} />
                                    <span className="text-sm">
                                      Add to group
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
