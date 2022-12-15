import React from "react";
import { backendService } from "../../services/backend";
import { useState, useEffect } from "react";
import { UserProfile } from "../../types";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>();

  const getProfile = () => {
    backendService
      .getUserProfile()
      .then((userProfile) => {
        setProfile(userProfile);
      })
      .catch((err) => {
        alert("Error: Loading your profile.");
      });
  };

  useEffect(getProfile, []);

  if (!profile) {
    return <p>Your profile is loaing</p>;
  }

  return (
    <>
      <h1>
        Welcome {profile.firstName} {profile.lastName}
      </h1>
      <h2>Your email is {profile.email}</h2>
    </>
  );
}
