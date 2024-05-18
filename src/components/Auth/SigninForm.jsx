import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const SigninForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="font-bold text-2xl">Sign in to Fiverr</h1>
      <Form
        form={form}
        name="signin"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <div className="flex gap-5">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link">
              <NavLink to="/auth/signup">Or Sign up</NavLink>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SigninForm;
