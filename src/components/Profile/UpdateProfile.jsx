import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  Typography,
  Divider,
  Tag,
  message,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getUserInfo,
  initUserFromStorage,
  updateUser,
} from "../../redux/actions/userActions";
import { jwtDecode } from "jwt-decode";
import { userLocal } from "../../services/userLocal";
import { pagePaths } from "../../paths";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserUpdateForm = () => {
  const [form] = Form.useForm();
  const info = useSelector((state) => state?.auth?.info);

  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState("");

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
      setSkills(info.skill || []);
      setCertifications(info.certification || []);
    }
  }, []);

  const onFinish = (values) => {
    if (user) {
      const formattedValues = {
        id: token.id,
        ...values,
        birthday: values.birthday.format("YYYY-MM-DD"),
        skill: skills,
        certification: certifications,
      };
      dispatch(updateUser(token.id, formattedValues));
    }
    else{
      navigate(pagePaths.signIn);
      message.error("You must be signed in to update your profile");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
  };

  const handleAddCertification = () => {
    if (newCertification.trim() !== "") {
      setCertifications([...certifications, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert) => {
    const updatedCertifications = certifications.filter((c) => c !== cert);
    setCertifications(updatedCertifications);
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

          <Form.Item name="email" label="Email" style={{ flex: "1 1 45%" }}>
            <Input prefix={<MailOutlined />} placeholder="Email" disabled />
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

          <Form.Item name="skill" label="Skill" initialValue={info?.skill}>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 60px)" }}
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a skill"
              />
              <Button type="primary" onClick={handleAddSkill}>
                Add
              </Button>
            </Input.Group>
            <div>
              {skills?.map((skill, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveSkill(skill)}
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </Form.Item>

          <Form.Item
            name="certification"
            label="Certification"
            initialValue={info?.certification}
          >
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 60px)" }}
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Enter a certification"
              />
              <Button type="primary" onClick={handleAddCertification}>
                Add
              </Button>
            </Input.Group>
            <div>
              {certifications?.map((cert, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveCertification(cert)}
                >
                  {cert}
                </Tag>
              ))}
            </div>
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
