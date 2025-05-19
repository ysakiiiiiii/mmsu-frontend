import React from "react";
import classNames from "classnames";

export const Button = ({ children, className, variant = "default", ...props }) => {
  const baseStyle = "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium";
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-500",
    link: "text-blue-600 underline hover:text-blue-800",
  };

  return (
    <button
      className={classNames(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
