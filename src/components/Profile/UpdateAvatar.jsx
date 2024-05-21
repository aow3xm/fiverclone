// src/components/UploadAvatar.js
import React, { useState } from 'react';
import { Upload, Avatar, Button, Card } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';

const UploadAvatar = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = info => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => setImageUrl(imageUrl));
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="flex flex-col items-center gap-10">
        <Avatar
          size={150}
          icon={<UserOutlined />}
          src={imageUrl}
          className="mb-6"
        />
        <Upload
          name="avatar"
          listType="picture"
          className="upload-list-inline"
          showUploadList={false}
          onChange={handleChange}
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
