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

export const updateProfile = async (id, data) => {
  try {
    const response = await http.put(`/users/${id}`, data, {
      method: "PUT",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await http.get(`/users/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const uploadAvatar = async (avatar) => {
  try {
    const response = await http.post("/users/upload-avatar", avatar, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const layDanhSachCongViecDaThue = async (token) => {
  try {
    const response = await http.get(`/thue-cong-viec/lay-danh-sach-da-thue`, 
      {
        headers:{
          'token': token
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}