import React, { useState, useEffect } from "react";
import { Upload, Avatar, Button, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { BASE_TOKEN } from "../../services/config";
import {jwtDecode} from "jwt-decode";
import { getUserInfo } from "../../redux/actions/userActions";

const UploadAvatar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.auth?.info);
  const token = useSelector((state) => state.auth?.user);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (user) {
      const jwt = jwtDecode(user);
      dispatch(getUserInfo(jwt.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.avatar) {
      setAvatarUrl(userInfo.avatar);
    }
  }, [userInfo]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must be smaller than 1MB!");
    }
    return isImage && isLt1M;
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      message.success("Your image updated successfully");
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      console.log(info.file.response);
    }
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="flex flex-col items-center gap-10">
        <Avatar
          size={150}
          icon={<UserOutlined />}
          src={avatarUrl}
          className="mb-6"
        />
        <Upload
          multiple={false}
          name="formFile"
          className="upload-list-inline"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleUploadChange}
          action="https://fiverrnew.cybersoft.edu.vn/api/users/upload-avatar"
          headers={{
            token: token,
            tokenCybersoft: BASE_TOKEN,
          }}
        >
          <Button type="primary" size="large" icon={<UploadOutlined />}>
            Upload Avatar
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default UploadAvatar;
