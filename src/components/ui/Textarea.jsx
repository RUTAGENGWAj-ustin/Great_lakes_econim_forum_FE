import React from "react";

const Textarea = ({ className, ...props }) => {
  return <textarea className={`border p-2 rounded ${className}`} {...props} />;
};

export default Textarea;
