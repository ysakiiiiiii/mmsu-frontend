import React from "react";
import classNames from "classnames";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
