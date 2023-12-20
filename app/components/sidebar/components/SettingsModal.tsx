"use client";

import { User } from "@prisma/client";
import Modal from "../../Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../inputs/Input";
import { is } from "date-fns/locale";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../../Button";

interface SettingsModalProps {
  isOpen?: boolean;
  currentUser: User;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch, // what watch does is it watches for changes in the form
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image"); // watch the image field for changes

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true }); // set the image field to the secure_url of the uploaded image
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then((res) => {
        router.refresh();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4">
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-6">
            <div className="border-b border-gray-900/10 pb-1 mb-4">
              <h2>
                <span className="block text-sm font-semibold text-gray-900">
                  Account
                </span>
              </h2>
              <p>
                <span className="block text-xs text-gray-500 font-light">
                  Here you can update your profile information.
                </span>
              </p>
            </div>

            <div className="mb-4">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Photo
              </label>
              <div className="mt-1 flex items-center gap-x-3">
                <Image
                  width="48"
                  height="48"
                  className="rounded-full"
                  src={image || currentUser.image || "/images/placeholder.jpg"}
                  alt="Avatar"
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset="lb64hyyc">
                  <Button disabled={isLoading} secondary type="button">
                    Change
                  </Button>
                </CldUploadButton>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 w-3/6 float-right">
            <Button secondary disabled={isLoading} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
