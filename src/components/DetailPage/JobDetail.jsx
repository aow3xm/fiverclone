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
} from "antd";
import {
  InfoCircleOutlined,
  StarOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import Loading from "../Loading";
import Comment from "./Comment";

const { Meta } = Card;
const { Panel } = Collapse;

const JobDetail = ({ faqData }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobDetail = useSelector((state) => state.jobs.jobDetail);

  useEffect(() => {
    dispatch(fetchJobDetail(params.id));
  }, [dispatch, params.id]);

  if (!jobDetail || jobDetail.length === 0) {
    return <Loading />;
  }
  const job = jobDetail[0];

  return (
    <div className="container mx-auto">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card
            cover={
              <Image
                src={job.congViec.hinhAnh}
                alt={job.congViec.tenCongViec}
              />
            }
            actions={[
              <Statistic
                title="Price"
                prefix="$"
                value={job.congViec.giaTien}
                key="giaTien"
              />,
              <Statistic
                title="Rate"
                value={job.congViec.saoCongViec}
                prefix={<StarOutlined />}
                key="danhGia"
              />,
            ]}
          >
            <Meta
              title={job.congViec.tenCongViec}
              description={
                <div>
                  <div>
                    <Rate defaultValue={job.congViec.saoCongViec} disabled />
                    <span> {job.congViec.danhGia} rates</span>
                  </div>
                  <p>{job.tenChiTietLoai}</p>
                  <p>{job.congViec.moTaNgan}</p>
                </div>
              }
              avatar={<Avatar src={job.avatar} />}
            />
          </Card>

          <Collapse defaultActiveKey={["1"]} bordered={false}>
            <Panel header="About This Gig" key="1">
              <p>{job.congViec.moTa}</p>
            </Panel>
            <Panel header="About The Seller" key="2">
              <div className="flex items-center gap-3">
                <Avatar size={"large"} src={job.avatar} />
                <div className="flex flex-col">
                  <span className="font-bold">{job.tenNguoiTao}</span>
                  <Button size="large">Contact me</Button>
                </div>
              </div>
            </Panel>
          </Collapse>

          <Collapse defaultActiveKey={["3"]} bordered={false}>
            {faqData?.map((faq, index) => (
              <Panel header={faq.title} key={index}>
                <p>{faq.content}</p>
              </Panel>
            ))}
          </Collapse>
        </Col>
        <Col xs={24} md={8}>
          <div className="flex flex-col gap-2">
            <div className=" rounded p-3 border border-black/10 space-y-3  font-bold">
              <h2 className="text-xl">{job.congViec.moTaNgan}</h2>
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <InfoCircleOutlined />
                  <span>14 Days Delivery</span>
                </div>
                <div className="space-x-2">
                  <UndoOutlined />
                  <span>Unlimited Revisions</span>
                </div>
              </div>
              <Button  type="primary" danger size="large" block>
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
