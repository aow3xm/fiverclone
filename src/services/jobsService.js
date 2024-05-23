import { http } from "./config";

export const layDanhSachCongViec = async () => {
  try {
    const response = await http.get("cong-viec/lay-menu-loai-cong-viec");
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};

export const layCongViecTheoChiTietLoai = async (maChiTietLoai) => {
  try {
    const response = await http.get(
      `cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`
    );
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};

export const layCongViecChiTiet = async (maCongViec) => {
  try {
    const response = await http.get(
      `cong-viec/lay-cong-viec-chi-tiet/${maCongViec}`
    );
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};

export const layCongViecTheoTen = async (tenCongViec) => {
  try {
    const response = await http.get(
      `cong-viec/lay-danh-sach-cong-viec-theo-ten/${tenCongViec}`
    );
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};

export const layChiTietLoaiCongViec = async (maChiTietLoai) => {
  try {
    const response = await http.get(
      `cong-viec/lay-chi-tiet-loai-cong-viec/${maChiTietLoai}`
    );
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
}

export const thueCongViec = async (data, token)=>{
  try {
    const response = await http.post(`thue-cong-viec`,data, {
      headers:{
        'token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const xoaCongViec = async (maCongViec, token)=>{
  try {
    const response = await http.delete(`thue-cong-viec/${maCongViec}`,{
      headers:{
        'token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}