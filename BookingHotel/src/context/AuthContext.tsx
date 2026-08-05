import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../api/authApi";

import type { User } from "../api/authApi";

interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    password: string,
  ) => Promise<boolean>;

  register: (
    userData: Omit<User, "id">,
  ) => Promise<boolean>;

  logout: () => void;

  updateUser: (
    id: number,
    userData: Partial<User>,
  ) => Promise<boolean>;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(
    null,
  );

  // Load saved user
  useEffect(() => {
    const savedUser = localStorage.getItem(
      "hotel_user",
    );

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login
  const login = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const loggedUser = await loginUser(
        email,
        password,
      );

      if (!loggedUser) {
        return false;
      }

      setUser(loggedUser);

      localStorage.setItem(
        "hotel_user",
        JSON.stringify(loggedUser),
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  // Register
  const register = async (
    userData: Omit<User, "id">,
  ): Promise<boolean> => {
    try {
      await registerUser(userData);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  // Update profile
  const updateUser = async (
    id: number,
    userData: Partial<User>,
  ): Promise<boolean> => {
    try {
      const updatedUser = await updateUserProfile(
        id,
        userData,
      );

      setUser(updatedUser);

      localStorage.setItem(
        "hotel_user",
        JSON.stringify(updatedUser),
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      "hotel_user",
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(
    AuthContext,
  );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
};