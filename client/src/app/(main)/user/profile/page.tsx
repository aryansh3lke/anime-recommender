import React from "react";
import ProfileNavbar from "@/components/profile/ProfileNavbar";
import Profile from "@/components/profile/Profile";

export default function ProfilePage() {
  return (
    <>
      <ProfileNavbar isProfileSelected />
      <Profile />
    </>
  );
}
