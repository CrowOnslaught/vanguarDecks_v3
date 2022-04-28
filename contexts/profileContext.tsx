import User from "models/User";
import React, { ReactNode, useContext, useState } from "react";

type profileContextType = {
  profile: User | null;
};

const profileContextDefaultValues: profileContextType = {
  profile: null,
};

const ProfileContext = React.createContext<profileContextType>(
  profileContextDefaultValues
);

export function useProfile() {
  return useContext(ProfileContext);
}

type Props = {
  children: ReactNode;
  profile: User | null;
};

export function ProfileProvider({ children, profile }: Props) {
  return (
    <>
      <ProfileContext.Provider
        value={{
          profile,
        }}>
        {children}
      </ProfileContext.Provider>
    </>
  );
}
