import { http } from "./config";

export const layDanhSachUser = async () => {
  try {
    const response = await http.get("users");
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const xoaUser = async (id) => {
  try {
    const response = await http.delete(`users?id=${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const layDanhSachJob = async () => {
  try {
    const response = await http.get("cong-viec");
    return response.data.content;
  } catch (error) {
    throw error.response.data;
  }
};
export const xoaJob = async (id, token) => {
  try {
    const response = await http.delete(`cong-viec/${id}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const themJob = async (job, token) => {
  try {
    const response = await http.post("cong-viec", job, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
