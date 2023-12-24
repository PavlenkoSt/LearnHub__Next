import React from "react";
import Avatar from "@/src/shared/UI/Avatar";
import { getImageSrc } from "@/src/shared/utilts/getImageSrc";
import { IUser } from "@/src/entities/types/User";
import UploadAvatar from "@/src/features/user/UploadAvatar";

interface IProps {
  user?: IUser;
}

export default function UserAvatar({ user }: IProps) {
  return (
    <div className="  flex items-center justify-center md:-mt-5">
      <UploadAvatar>
        <Avatar
          src={getImageSrc(user?.image) || "/Avatar.svg"}
          size={140}
          rounded
        />
      </UploadAvatar>
    </div>
  );
}
