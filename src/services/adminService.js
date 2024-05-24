import { http } from "./config";

export const layDanhSachUser = async () => {
  try {
    const response = await http.get("users");
    return response.data.content;
  } catch (error) {
    return error;
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

export const capNhatUser = async (data) => {
  try {
    const response = await http.put(`users/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export const layDanhSachJob = async () => {
  try {
    const response = await http.get("cong-viec");
    return response.data.content;
  } catch (error) {
    return error.response.data;
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

export const layDanhSachLoaiCongViec = async () => {
  try {
    const response = await http.get("loai-cong-viec");
    return response.data.content;
  } catch (error) {
    return error.response.data;
  }
};

export const layDanhSachThueCongViec = async ()=>{
  try {
    const response = await http.get("thue-cong-viec");
    return response.data.content;
  } catch (error) {
    return error.response.data;
  }
}

export const capNhatThueCongViec = async (service, token) => {
  try {
    const response = await http.put(`thue-cong-viec/${service.id}`, service, {
      headers: {
        'token': token
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export const layDanhSachBinhLuan = async ()=>{
  try {
    const response = await http.get("binh-luan");
    return response.data.content;
  } catch (error) {
    return error.response.data;
  }
}

export const xoaBinhLuan = async (id, token) => {
  try {
    const response = await http.delete(`binh-luan/${id}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

export const timBinhLuanTheoId = async (id) => {
  try {
    const response = await http.get(`binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
    return response.data.content;
  } catch (error) {
    return error.response.data;
  }
}