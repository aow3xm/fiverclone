import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Radio, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { updateUser } from "../../redux/actions/userActions"; // Giả sử bạn có action này

const { Title } = Typography;

const UserUpdateForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        birthday: moment(user.birthday),
      });
    }
  }, [user, form]);

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday.format("YYYY-MM-DD"),
    };
    // dispatch(updateUser(formattedValues));
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-md">
      <Title level={2} className="text-center">Update Your Information</Title>
      <Divider />
      <Form
        form={form}
        name="userUpdate"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthday: moment(user.birthday),
          gender: user.gender,
          role: user.role,
          skill: user.skill,
          certification: user.certification,
          bookingJob: user.bookingJob,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
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
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: false }]}
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
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone" />
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[{ required: true, message: "Please select your date of birth!" }]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Date of Birth" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
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
        >
          <Radio.Group>
            <Radio value="USER">User</Radio>
            <Radio value="ADMIN">Admin</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="skill"
          label="Skill"
        >
          <Input placeholder="Skill" />
        </Form.Item>

        <Form.Item
          name="certification"
          label="Certification"
        >
          <Input placeholder="Certification" />
        </Form.Item>

        <Form.Item
          name="bookingJob"
          label="Booking Job"
        >
          <Input placeholder="Booking Job" />
        </Form.Item>

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
