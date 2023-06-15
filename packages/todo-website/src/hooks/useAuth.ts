import { useContext, useMemo } from "react";
import { UserContext } from "../components/contexts/UserContext";

export const useAuth = () => {
  // todo: return user information and router.push for login/logout
  const { user, refreshUser, login, logout } = useContext(UserContext);
  const returnValue = useMemo(() => {
    return { user, refreshUser, login, logout };
  }, [user, refreshUser, login, logout]);
  return returnValue;
};

export default useAuth;
