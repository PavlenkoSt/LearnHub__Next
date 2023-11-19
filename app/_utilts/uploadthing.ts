import { generateComponents } from "@uploadthing/react";
import { Router } from "../api/uploadthing/route";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<Router>();
