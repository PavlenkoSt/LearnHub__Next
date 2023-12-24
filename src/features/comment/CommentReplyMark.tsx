import React from "react";
import { FaReplyAll } from "react-icons/fa";

interface IProps {
  height?: number;
}

export default function CommentReplyMark({ height }: IProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: height || 56,
        width: 56,
      }}
    >
      <FaReplyAll size={20} />
    </div>
  );
}
