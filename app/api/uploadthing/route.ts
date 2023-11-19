import {
  FileRouter,
  createNextRouteHandler,
  createUploadthing,
} from "uploadthing/next";

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
    };
  },
});

export const router = {
  uploadAvatar: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    return { url: file.url };
  }),
} satisfies FileRouter;

export type Router = typeof router;

export const { GET, POST } = createNextRouteHandler({
  router,
});
