import { http } from "./config";

export const layDanhSachBinhLuan = async (maCongViec) => {
  try {
    const response = await http.get(
      `/binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`
    );
    return response.data.content;
  } catch (error) {}
};
