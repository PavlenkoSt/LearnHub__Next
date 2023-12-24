import React from "react";
import SignOut from "@/src/features/navigation/SignOut";
import ProfileAvatarNav from "@/src/features/navigation/ProfileAvatarNav";
import SearchArticleNav from "@/src/features/navigation/SearchArticleNav";

export default function Header() {
  return (
    <div className="flex h-[50px] items-center justify-end gap-2 bg-gray-200 px-5 md:h-[60px]">
      <ProfileAvatarNav />
      <SearchArticleNav />
      <SignOut />
    </div>
  );
}
