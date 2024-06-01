import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Divider } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  PinterestFilled,
  InstagramFilled,
  TransactionOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const PageFooter = () => {
  const footerData = [
    {
      title: "Categories",
      links: [
        "Digital Marketing",
        "Writing & Translation",
        "Video & Animation",
        "Music & Audio",
        "Programming & Tech",
        "Data",
        "Business",
        "Lifestyle",
        "Sitemap",
      ],
    },
    {
      title: "About",
      links: [
        "Careers",
        "Press & News",
        "Partnerships",
        "Privacy Policy",
        "Terms of Service",
        "Intellectual Property Claims",
        "Investor Relations",
      ],
    },
    {
      title: "Support",
      links: [
        "Help & Support",
        "Trust & Safety",
        "Selling on Fiverr",
        "Buying on Fiverr",
      ],
    },
    {
      title: "Community",
      links: [
        "Events",
        "Blog",
        "Forum",
        "Community Standards",
        "Podcast",
        "Affiliates",
        "Invite a Friend",
        "Become a Seller",
      ],
    },
    {
      title: "More From Fiverr",
      links: [
        "Fiverr Business",
        "Fiverr Pro",
        "Fiverr Studios",
        "Fiverr Logo Maker",
        "Fiverr Guides",
        "Get Inspired",
        "Fiverr Select",
        "ClearVoice",
        "Content Marketing",
        "Fiverr Workspace",
        "Invoice Software",
        "Learn",
        "Online Courses",
        "Working Not Working",
      ],
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <Divider />
      <div className="container mx-auto px-4">
        <Row gutter={[16, 16]} justify="center">
          {footerData?.map((column, index) => (
            <Col xs={24} sm={12} md={8} lg={4} key={index}>
              <h3 className="text-lg font-semibold mb-4 text-center">
                {column.title}
              </h3>
              <ul className="space-y-2 text-center">
                {column.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <NavLink
                      to="#"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
        <Divider />
        <div className="flex justify-between items-center text-center mt-10 text-gray-600">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <h3 className="text-4xl font-bold">fiverr.</h3>
            <p className="text-xs">&copy; 2024 Fiverr. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="flex gap-3">
              <NavLink to="#">
                <FacebookFilled className="text-2xl hover:text-blue-600 transition duration-300" />
              </NavLink>
              <NavLink to="#">
                <TwitterCircleFilled className="text-2xl hover:text-blue-400 transition duration-300" />
              </NavLink>
              <NavLink to="#">
                <PinterestFilled className="text-2xl hover:text-red-600 transition duration-300" />
              </NavLink>
              <NavLink to="#">
                <InstagramFilled className="text-2xl hover:text-pink-600 transition duration-300" />
              </NavLink>
            </div>
            <div className="flex gap-3 items-center">
              <NavLink to={"#"} className="flex items-center gap-1">
                <TransactionOutlined className="text-xl" /> English
              </NavLink>
              <p>US$ USD</p>
              <QuestionCircleOutlined className="text-xl hover:text-gray-800 transition duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
