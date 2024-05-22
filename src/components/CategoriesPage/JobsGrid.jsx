import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsCategories } from "../../redux/actions/jobsActions";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row, Rate, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ShowEmpty from "../Loading";

const { Meta } = Card;

const JobsGrid = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobsCategories = useSelector((state) => state.jobs.jobsCategories);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchJobsCategories(params.id));
  }, [dispatch, params.id]);

  if (!jobsCategories || jobsCategories.length === 0) {
    return <ShowEmpty />;
  }

  return (
    <div className="container mx-auto">
      <Row gutter={[16, 16]} className="flex flex-wrap">
        {jobsCategories?.map((job) => (
          <Col key={job.id} xs={24} sm={12} md={8} lg={8} xl={6} className="flex">
            <Card
              hoverable
              onClick={() => {
                navigate(`/detail/${job.congViec.id}`);
              }}
              className="flex flex-col h-full"
              cover={
                <img
                  alt={job.congViec.tenCongViec}
                  src={job.congViec.hinhAnh}
                  className="h-52 object-cover"
                />
              }
            >
              <Meta
                title={job.congViec.tenCongViec}
                description={job.congViec.moTaNgan.slice(0, 50) + "..."}
              />
              <div className="job-details mt-2 space-y-2 flex-grow">
                <Rate disabled defaultValue={job.congViec.saoCongViec} />
                <p>${job.congViec.giaTien}</p>
                <div className="space-x-2">
                  <Avatar
                    size="small"
                    icon={<UserOutlined />}
                    src={job.avatar}
                  />
                  <span className="font-bold">{job.tenNguoiTao}</span>
                </div>
                <Tag color="green">{job.tenLoaiCongViec}</Tag>
                <Tag color="purple">{job.tenChiTietLoai}</Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobsGrid;
