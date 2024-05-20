import { http } from "./config";

export const signIn = async (data) => {
  try {
    const response = await http.post("/api/auth/signin", {
      data,
    });
  } catch (error) {}
};
