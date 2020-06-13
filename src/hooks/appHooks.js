import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";

const useAppContext = () => useContext(AppContext);

export const useApp = () => {
  const isLoading = useAppContext().isLoading;
  const setIsLoading = useAppContext().setIsLoading;
  const isLoggedIn = useAppContext().isLoggedIn;
  const setIsLoggegIn = useAppContext().setIsLoggegIn;
  const users = useAppContext().users;
  const setUsers = useAppContext().setUsers;
  const loginError = useAppContext().loginError;
  const setLoginError = useAppContext().setLoginError;
  const handleLogin = useAppContext().handleLogin;
  const token = useAppContext().token;
  const setToken = useAppContext().setToken;
  const fetchUsers = useAppContext().fetchUsers;

  return {
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggegIn,
    users,
    setUsers,
    loginError,
    setLoginError,
    handleLogin,
    token,
    setToken,
    fetchUsers
  };
};
