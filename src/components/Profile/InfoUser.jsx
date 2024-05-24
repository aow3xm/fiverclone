import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserInfo } from "../../redux/actions/userActions";
import { Card, Button, Divider, List, Typography, Tag, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const { Title, Text } = Typography;

const UserInfoCard = ({ info, initial }) => (
  <Card className="max-w-md mx-auto rounded-xl  shadow-md overflow-hidden md:max-w-2xl">
    {info?.avatar ? (
      <div className="flex justify-center items-center">
        <Avatar size={128} src={info.avatar} className="mx-auto my-8" />
      </div>
    ) : (
      <div className="flex items-center justify-center w-44 h-44 bg-gray-500 rounded-full text-white text-3xl mx-auto my-8">
        <Title level={1} className="text-5xl">
          {initial}
        </Title>
      </div>
    )}
    <Title level={3} className="text-center">
      {info?.name}
    </Title>
    <div className="flex items-center justify-center mt-2">
      <Button type="link">
        <NavLink to="/update">
          <FontAwesomeIcon icon={faPen} />
        </NavLink>
      </Button>
    </div>
    <Divider />
    <UserInfoDetail icon={faLocationDot} label="From" value="Vietnam" />
    <UserInfoDetail icon={faUser} label="Position" value="Member" />
  </Card>
);
const UserInfoDetail = ({ icon, label, value }) => (
  <div className="flex justify-between px-4 py-2">
    <div className="flex items-center">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      <Text>{label}</Text>
    </div>
    <Text>{value}</Text>
  </div>
);

const UserInfoDetails = ({ info, gender }) => (
  <Card className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-6">
    <div className="p-4">
      <Section title="Description" linkText="Edit Description" />
      <Section title="Languages" linkText="Add Now" content="Basic - English" />
      <UserInformation info={info} gender={gender} />
      <LinkedAccounts />
    </div>
  </Card>
);

const Section = ({ title, linkText, content }) => (
  <>
    <div className="flex justify-between items-center">
      <Text className="font-semibold">{title}</Text>
      <Button type="link" className="text-blue-400">
        {linkText}
      </Button>
    </div>
    <Divider />
    {content && <Text className="mt-6">{content}</Text>}
  </>
);

const UserInformation = ({ info, gender }) => (
  <div className="mt-10">
    <Title level={4} className="text-center mb-8">
      User Information
    </Title>
    <UserInfoField label="Email" value={info?.email} />
    <UserInfoField label="Phone" value={info?.phone} />
    <UserInfoField label="Birthday" value={info?.birthday} />
    <UserInfoField label="Gender" value={gender} />
    <UserInfoField label="Role" value={info?.role} />
    <UserSkillsAndCertifications info={info} />
  </div>
);

const UserInfoField = ({ label, value }) => (
  <div className="flex my-4 mx-2 font-semibold">
    <Text className="mr-1">{label} : </Text>
    <Text className="text-gray-500">{value}</Text>
  </div>
);

const UserSkillsAndCertifications = ({ info }) => (
  <>
    <UserList title="Skills" items={info?.skill} />
    <UserList title="Certifications" items={info?.certification} />
  </>
);

const UserList = ({ title, items }) => (
  <div className="mt-4 mx-2">
    <Text className="font-semibold mb-2">{title}</Text>
    {items?.length > 0 ? (
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <Tag>{item}</Tag>
          </List.Item>
        )}
      />
    ) : (
      <Text className="text-gray-500"> : No {title.toLowerCase()} listed</Text>
    )}
  </div>
);

const LinkedAccounts = () => {
  const accounts = [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Google", url: "https://google.com" },
    { name: "Dribbble", url: "https://dribbble.com" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
    { name: "Github", url: "https://github.com" },
    { name: "Twitter", url: "https://twitter.com" },
  ];

  return (
    <div className="mt-10">
      <Title level={4} className="mb-2">
        Linked Accounts
      </Title>
      {accounts?.map((account, index) => (
        <div className="flex mx-4" key={index}>
          <Button
            type="link"
            href={account.url}
            className="text-blue-400 font-semibold mr-3"
          >
            +
          </Button>
          <Button type="link" href={account.url} className="text-blue-400">
            {account.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
const InfoUser = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [userInfoFetched, setUserInfoFetched] = useState(false);
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state?.auth);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (info && info.id && !userInfoFetched) {
        try {
          await dispatch(getUserInfo(info.id));
          setShowInfo(true);
          setUserInfoFetched(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserInfo();
  }, [dispatch, info, userInfoFetched]);

  const initial = info?.name.charAt(0).toUpperCase();
  const gender =
    info?.gender !== undefined ? (info.gender ? "Male" : "Female") : "";
  return (
    <div>
      <UserInfoCard info={info} initial={initial} />
      {showInfo && <UserInfoDetails info={info} gender={gender} />}
    </div>
  );
};

export default InfoUser;
