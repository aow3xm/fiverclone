import React from "react";
import UserUpdateForm from "../../components/Profile/UpdateProfile";
import UploadAvatar from "../../components/Profile/UpdateAvatar";

const ProfilePage = () => {
  return (
    <div className="container mx-auto flex justify-center gap-5">
      <UploadAvatar />
      <UserUpdateForm />
    </div>
  );
};

export default ProfilePage;
