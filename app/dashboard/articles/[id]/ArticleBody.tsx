"use client";

import React from "react";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "@/app/_styles/quill-readonly.override.module.css";

interface IProps {
  body: string;
}

export default function ArticleBody({ body }: IProps) {
  return (
    <ReactQuill
      readOnly
      modules={{ toolbar: null }}
      value={DOMPurify.sanitize(body)}
      className={styles.editor}
    />
  );
}
