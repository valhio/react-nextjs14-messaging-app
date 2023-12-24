"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true }); // Reset the message field to an empty string and shouldValidate will re-render the component
    axios.post(`/api/messages`, { ...data, conversationId: conversationId }); // data is the useForm data (message)
  };

  const handleUpload = (result:any ) => { // result is the result from the Cloudinary upload. How this works is that the CldUploadButton component will call the handleUpload function and pass the result from the Cloudinary upload to it. The result will contain the secure_url of the uploaded image. We will then send the secure_url to the server. How CldUploadButton works is that it will upload the image to Cloudinary, using the upload preset that we specified in the options prop. Then it will call the onUpload function and pass the result from the Cloudinary upload to it. 
    const imageUrl = result.info.secure_url; // Get the secure_url from the result
    axios.post(`/api/messages`, { conversationId: conversationId, image: imageUrl }); // Send the imageUrl to the server
  }

  return (
    <div className="py-2 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="lb64hyyc">
        <HiPhoto
          size={26}
          className="text-gray-500 hover:text-gray-700 cursor-pointer transition duration-200 ease-in-out"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm font-semibold">
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
