export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: string;
}

const API_URL = "http://localhost:3000/users";

// Register User

export const registerUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  const data: User = await response.json();

  return data;
};

// Login User

export const loginUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const users: User[] = await response.json();

  const user = users.find(
    (user) =>
      user.email.trim().toLowerCase() ===
        email.trim().toLowerCase() &&
      user.password === password,
  );

  return user || null;
};

// Update User Profile

export const updateUserProfile = async (
  id: number,
  userData: Partial<User>,
): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};