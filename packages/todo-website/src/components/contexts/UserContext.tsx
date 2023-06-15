import { createContext, useEffect, useState } from "react";
import { User } from "../../types";

type UserContextType = {
  user: User | null | boolean;
  refreshUser: () => void;
  login: () => void;
  logout: () => void;
};

const getUser = async () => {
  // get azure static web app user
  try {
    const user = await fetch("/.auth/me");
    const userJson = await user.json();
    const { clientPrincipal } = userJson;
    return clientPrincipal ? clientPrincipal : false;
  } catch (err) {
    console.error("something went wrong", err);
  }
};

export const UserContext = createContext<UserContextType>({
  user: null,
  refreshUser: () => {
    console.log("stub: IMPLEMENT ME");
  },
  login: () => {
    console.log("stub: IMPLEMENT ME");
  },
  logout: () => {
    console.log("stub: IMPLEMENT ME");
  },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const defaultUserContext: UserContextType = {
    user: user,
    refreshUser: async () => setUser(await getUser()),
    login: () => {
      console.log("stub: IMPLEMENT ME");
    },
    logout: () => {
      console.log("stub: IMPLEMENT ME");
    },
  };

  useEffect(() => {
    getUser().then((fetchedUser) => setUser(fetchedUser));
  }, []);

  return (
    <UserContext.Provider value={defaultUserContext}>
      {children}
    </UserContext.Provider>
  );
};
