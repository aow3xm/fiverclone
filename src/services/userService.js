import { http } from "./config";

export const signIn = async (data) => {
  try {
    const response = await http.post("/auth/signin", data); 
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await http.post("/auth/signup", data); 
    return response;
  } catch (error) {
    throw error;
  }
};
