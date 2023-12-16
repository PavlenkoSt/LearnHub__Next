import { useSearchParams } from "next/navigation";

export const useCommentReplyToActive = (commentId: number) => {
  const searchParams = useSearchParams();

  const replyTo = searchParams.get("replyTo");
  const isActive = replyTo && +replyTo === commentId;

  return isActive;
};
