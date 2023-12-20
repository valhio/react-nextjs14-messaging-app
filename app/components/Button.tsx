"use client";

import clsx from "clsx";

interface ButtonProps {
  // variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'light' | 'dark' | 'link' | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type: type,
  fullWidth: fullWidth,
  children: children,
  onClick: onClick,
  secondary: secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex justify-center py-2 px-4 shadow-sm font-medium rounded-lg text-sm focus:outline-none ",
        fullWidth && "w-full",
        secondary && "text-gray-900 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100",
        danger && "bg-red-600 hover:bg-red-700 text-white",
        !secondary && !danger && "bg-blue-600 hover:bg-blue-700 text-white",
        disabled && "cursor-not-allowed hover:bg-gray-100 text-gray-300"
      )}>
      {children}
    </button>
  );
};

export default Button;
