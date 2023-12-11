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
        "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        fullWidth && "w-full",
        secondary && "bg-gray-700 hover:bg-gray-800",
        danger && "bg-red-600 hover:bg-red-700",
        !secondary && !danger && "bg-blue-600 hover:bg-blue-700",
        disabled && "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
      )}>
      {children}
    </button>
  );
};

export default Button;
