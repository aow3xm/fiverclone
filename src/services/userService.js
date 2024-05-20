import { http } from "./config";

export const userSer = {
  signIn: (data) => {
    return http.post("/auth/signin", data)
  },
  signUp: (data) => {
    return http.post("/auth/signup", data)
  }
}
