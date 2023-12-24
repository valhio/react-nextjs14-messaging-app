"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  placeholder?: string;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  register,
  required,
  placeholder,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required: required })}
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 `placeholder-gray-500 placeholder-opacity-50 "></input>
    </div>
  );
};

export default MessageInput;
