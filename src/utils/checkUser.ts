import { User } from "../types/user";

export const checkUser = async (): Promise<User | null> => {
  const res = await fetch("/api/user/current");

  if (res.ok) {
    return await res.json();
  }

  return null;
};
