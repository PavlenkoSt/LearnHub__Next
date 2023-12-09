"use client";

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
  value: string;
  setValue: (val: string) => void;
}

export default function ArticleBodyEditor({ value, setValue }: IProps) {
  return (
    <ReactQuill
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],

          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],

          ["clean"],
        ],
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true,
        },
      }}
      value={value}
      onChange={setValue}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
