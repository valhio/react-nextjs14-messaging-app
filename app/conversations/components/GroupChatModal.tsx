"use client";

import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Users from "@/app/users/page";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        router.refresh();
        onClose();
        router.push(`/conversations/${res.data.id}`);
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 py-4">
          <div className="text-lg font-bold text-neutral-800">
            Create a group chat
          </div>
          <p className="mt-1 text-xs text-neutral-600">
            Group chats are where your friends can communicate together.
          </p>
          <div className="mt-4 space-y-4">
            <Input
              disabled={isLoading}
              label="Group name"
              id="name"
              errors={errors}
              required
              register={register}
            />
            <Select
              disabled={isLoading}
              label="Members"
              options={users.map((user) => ({
                // options is a prop that allows us to customize the select's options.
                value: user.id,
                image: user.image || '/images/placeholder.jpg',
                label: user.name,
              }))}
              onChange={(value) =>
                setValue("members", value, {
                  shouldValidate: true,
                })
              }
              value={members}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="members"
              className="block text-sm font-medium text-neutral-700">
              Selected members ({members.length})
            </label>
            <div className="flex flex-row overflow-x-auto">
              {members.map((member: any) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center mt-2">
                  <Avatar user={member} />
                  <div className="ml-2 text-sm font-medium text-neutral-800 truncate w-20 text-center">
                    {member.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-3 bg-gray-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-900 hover:text-neutral-700">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 rounded-md disabled:opacity-50">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
