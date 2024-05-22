import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  Typography,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getUserInfo,
  initUserFromStorage,
  updateUser,
} from "../../redux/actions/userActions";
import { jwtDecode } from "jwt-decode";
import { userLocal } from "../../services/userLocal";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserUpdateForm = () => {
  const [form] = Form.useForm();
  const info = useSelector((state) => state?.auth?.info);

  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const user = useSelector((state) => state?.auth?.user);
  useEffect(() => {
    if (user) {
      const jwt = jwtDecode(user);
      setToken(jwt);
      dispatch(getUserInfo(jwt.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (info) {
      form.setFieldsValue({
        ...info,
        birthday: moment(info.birthday),
      });
    }
  }, [info, form]);

  const onFinish = (values) => {
    const formattedValues = {
      id: token.id,
      ...values,
      birthday: values.birthday.format("YYYY-MM-DD"),
      skill: values.skill
        ? values.skill.split(",").map((skill) => skill.trim())
        : [],
      certification: values.certification
        ? values.certification.split(",").map((cert) => cert.trim())
        : [],
    };
    dispatch(updateUser(token.id, formattedValues));
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-md">
      <Title level={2} className="text-center">
        Update Your Information
      </Title>
      <Divider />
      <Form form={form} name="userUpdate" onFinish={onFinish} layout="vertical">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
            style={{ flex: "1 1 45%" }}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
            style={{ flex: "1 1 45%" }}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: false }]}
            style={{ flex: "1 1 45%" }}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits!",
              },
            ]}
            style={{ flex: "1 1 45%" }}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone" />
          </Form.Item>

          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[
              { required: true, message: "Please select your date of birth!" },
            ]}
            style={{ flex: "1 1 45%" }}
          >
            <DatePicker style={{ width: "100%" }} placeholder="Date of Birth" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
            style={{ flex: "1 1 45%" }}
          >
            <Radio.Group>
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select your role!" }]}
            style={{ flex: "1 1 45%" }}
          >
            <Radio.Group>
              <Radio value="USER">User</Radio>
              <Radio value="ADMIN">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="skill" label="Skill" style={{ flex: "1 1 45%" }}>
            <Input placeholder="Skill (comma separated)" />
          </Form.Item>

          <Form.Item
            name="certification"
            label="Certification"
            style={{ flex: "1 1 45%" }}
          >
            <Input placeholder="Certification (comma separated)" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Information
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserUpdateForm;
