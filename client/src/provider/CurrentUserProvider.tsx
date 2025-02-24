import { getCurrentUser } from "@/services/auth.service";
import { EUserRole, IProfile, IUser } from "@/types/user.type";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TContextValue = {
  isLoading: boolean;
  error: any;
  user: IUser | null;
  profile: IProfile | undefined;
  setIsLoading: (bol: boolean) => void;
  setError: (err: any) => void;
  setUser: (user: IUser | null) => void;
  refetch: () => void;
};
const UserContext = createContext<TContextValue | null>(null);

function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const handelUser = async () => {
    setIsLoading(true);
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handelUser();
  }, [toggle]);

  const refetch = () => {
    setToggle(!toggle);
  };

  const profile =
    user?.role === EUserRole.Author
      ? user.author
      : user?.role === EUserRole.Reader
        ? user.reader
        : user?.staff;

  const value = {
    isLoading,
    error,
    user,
    profile,
    setIsLoading,
    setError,
    setUser,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default CurrentUserProvider;

export function useCurrentUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Use current user must be used within the currentUserProvider context");
  }
  return context as TContextValue;
}
