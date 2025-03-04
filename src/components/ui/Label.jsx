import React from "react";

const Label = ({ children, className, ...props }) => {
  return <label className={`font-semibold ${className}`} {...props}>{children}</label>;
};

export default Label;
