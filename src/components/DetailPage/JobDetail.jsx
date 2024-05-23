import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetail } from "../../redux/actions/jobsActions";
import {
  Card,
  Button,
  Image,
  Statistic,
  Rate,
  Avatar,
  Collapse,
  Row,
  Col,
  message,
} from "antd";
import {
  InfoCircleOutlined,
  StarOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import Loading from "../Loading";
import Comment from "./Comment";
import { rentJob } from "../../redux/actions/userActions";
import { jwtDecode } from "jwt-decode";

const { Meta } = Card;
const { Panel } = Collapse;

const JobDetail = ({ faqData }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobDetail = useSelector((state) => state.jobs?.jobDetail);
  const auth = useSelector((state)=>state.auth?.user)
  useEffect(() => {
    dispatch(fetchJobDetail(params.id));
  }, [dispatch, params.id]);

  if (!jobDetail || jobDetail.length === 0) {
    return <Loading />;
  }
  const job = jobDetail[0];
  const handleRentJob = ()=>{
    if(!auth){
      message.error('You must be signed in to rent job')
      return;
    }
    const token = jwtDecode(auth);
    const data = {
      maCongViec: params.id, 
      maNguoiThue: token.id, 
      ngayThue: new Date()
    }
    dispatch(rentJob(data, auth))
  }
  return (
    <div className="container mx-auto p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card
            cover={
              <Image
                src={job.congViec.hinhAnh}
                alt={job.congViec.tenCongViec}
                className="rounded-t-lg"
              />
            }
            actions={[
              <Statistic
                title="Price"
                prefix="$"
                value={job.congViec.giaTien}
                key="giaTien"
                className="text-center"
              />,
              <Statistic
                title="Rate"
                value={job.congViec.saoCongViec}
                prefix={<StarOutlined />}
                key="danhGia"
                className="text-center"
              />,
            ]}
            className="shadow-lg rounded-lg"
          >
            <Meta
              title={job.congViec.tenCongViec}
              description={
                <div>
                  <div className="flex items-center">
                    <Rate defaultValue={job.congViec.saoCongViec} disabled />
                    <span className="ml-2">{job.congViec.danhGia} rates</span>
                  </div>
                  <p className="mt-2">{job.tenChiTietLoai}</p>
                  <p>{job.congViec.moTaNgan}</p>
                </div>
              }
              avatar={<Avatar src={job.avatar} />}
            />
          </Card>

          <Collapse defaultActiveKey={["1"]} bordered={false} className="mt-4">
            <Panel header="About This Gig" key="1">
              <p>{job.congViec.moTa}</p>
            </Panel>
            <Panel header="About The Seller" key="2">
              <div className="flex items-center gap-3">
                <Avatar size={"large"} src={job.avatar} />
                <div className="flex flex-col">
                  <span className="font-bold">{job.tenNguoiTao}</span>
                  <Button size="large" className="mt-2">Contact me</Button>
                </div>
              </div>
            </Panel>
          </Collapse>

          <Collapse defaultActiveKey={["3"]} bordered={false} className="mt-4">
            {faqData?.map((faq, index) => (
              <Panel header={faq.title} key={index}>
                <p>{faq.content}</p>
              </Panel>
            ))}
          </Collapse>
        </Col>
        <Col xs={24} md={8}>
          <div className="flex flex-col gap-4">
            <div className="rounded-lg p-4 border border-gray-200 shadow-sm space-y-3 font-bold">
              <h2 className="text-xl">{job.congViec.moTaNgan}</h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <InfoCircleOutlined />
                  <span>14 Days Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UndoOutlined />
                  <span>Unlimited Revisions</span>
                </div>
              </div>
              <Button onClick={handleRentJob} type="primary"  size="large" block>
                <span className="font-bold">
                  Continue (${job.congViec.giaTien})
                </span>
              </Button>
            </div>

            <Comment maCongViec={job.id} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetail;
