import React from "react";
import { IUser } from "@/src/entities/types/User";
import { UserFieldEnum } from "@/src/entities/types/UserFieldEnum";
import UpdateUserField from "@/src/features/user/UpdateUserField";
import { Card } from "@nextui-org/react";

interface IProps {
  user?: IUser;
}

export default function UserFields({ user }: IProps) {
  return (
    <div className="text-primary">
      {!!user?.firstName && !!user?.lastName && (
        <div className="text-center text-2xl font-bold">
          {user.firstName} {user.lastName}
        </div>
      )}
      <div className="my-2 flex items-center justify-center">
        <div className="w-full max-w-[600px]">
          <h2 className="mb-3 text-center text-xl font-medium">
            Personal Information
          </h2>
          <Card className="border-light border-[1px]">
            <UpdateUserField
              label="First name"
              fieldName="firstName"
              setFieldLabel="Set first name"
              fieldValue={user?.firstName || ""}
              formName={UserFieldEnum.FirstName}
            />
            <UpdateUserField
              label="Last name"
              fieldName="lastName"
              setFieldLabel="Set last name"
              fieldValue={user?.lastName || ""}
              formName={UserFieldEnum.LastName}
            />
            <UpdateUserField
              label="Email"
              fieldName="email"
              setFieldLabel="Set email"
              fieldValue={user?.email || ""}
              formName={UserFieldEnum.Email}
              isEmail
              isLast
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
