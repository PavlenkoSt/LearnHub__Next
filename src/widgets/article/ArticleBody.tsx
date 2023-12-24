"use client";

import React from "react";
import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "@/src/shared/styles/quill-readonly.override.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
