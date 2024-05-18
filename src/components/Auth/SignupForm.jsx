import React from "react";
import { Form, Input, Button, DatePicker, Radio, Checkbox } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const SignupForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    string: {
      range: "${label} must be between ${min} and ${max} characters",
    },
    pattern: {
      mismatch: "${label} is not valid!",
    },
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-2xl">Sign in to Fiverr</h1>
      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        validateMessages={validateMessages}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

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
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits!",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please select your date of birth!" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Date of Birth" />
        </Form.Item>

        <Form.Item
          name="sex"
          rules={[{ required: true, message: "Please select your sex!" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I agree to all statements in <a href="#">Terms of Service</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
