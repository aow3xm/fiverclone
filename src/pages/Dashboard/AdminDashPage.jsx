import {
  Layout,
  Menu,
  Table,
  Button,
  Avatar,
  message,
  Input,
  Modal,
  Form,
  Upload,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  layDanhSachJob,
  layDanhSachUser,
  xoaUser,
  xoaJob,
  layDanhSachLoaiCongViec,
  layDanhSachThueCongViec,
  layDanhSachBinhLuan,
  xoaBinhLuan,
  timBinhLuanTheoId,
  capNhatUser,
  capNhatThueCongViec,
  themJob,
  themLoaiCongViec,
  xoaLoaiCongViec,
} from "../../services/adminService";
import { NavLink } from "react-router-dom";
import { pagePaths } from "../../paths";
import { UploadOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchJobId, setSearchJobId] = useState("");
  const [searchedComments, setSearchedComments] = useState([]);
  const [isAddJobVisible, setIsAddJobVisible] = useState(false);
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [jobForm] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const auth = useSelector((state) => state.auth?.info);
  const token = useSelector((state) => state.auth?.user);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await layDanhSachUser();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await layDanhSachJob();
      setJobs(response);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await layDanhSachLoaiCongViec();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const response = await layDanhSachThueCongViec();
      setServices(response);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const response = await layDanhSachBinhLuan();
      setComments(response);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchJobs();
    fetchCategories();
    fetchServices();
    fetchComments();
  }, [fetchUsers, fetchJobs, fetchCategories, fetchServices, fetchComments]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await xoaUser(userId);
      if (response.statusCode !== 200) {
        message.error(response.content);
        return;
      }
      message.success(`Người dùng ${userId} đã được xoá`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRole = async (data) => {
    try {
      data.role === "ADMIN" ? (data.role = "USER") : (data.role = "ADMIN");
      const response = await capNhatUser(data);
      if (response.statusCode !== 200) {
        message.error(response.content);
        return;
      }
      message.success(`Vai trò của người dùng ${data.id} đã được thay đổi`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteJob = async (jobId) => {
    try {
      const response = await xoaJob(jobId, token);
      if (response.statusCode === 403) {
        message.error(response.content);
        return;
      }
      message.success(`Công việc ${jobId} đã được xoá`);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await xoaLoaiCongViec(categoryId, token);
      if (response.statusCode === 403) {
        message.error(response.content);
        return;
      }
      message.success(`Loại công việc ${categoryId} đã được xoá`);
      fetchCategories();
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi khi xoá loại công việc");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await xoaBinhLuan(commentId, token);
      if (response.statusCode !== 200) {
        message.error(response.content);
        return;
      }
      message.success(`Bình luận ${commentId} đã được xoá`);

      if (searchedComments.length > 0) {
        const updatedSearchedComments = searchedComments.filter(
          (comment) => comment.id !== commentId
        );
        setSearchedComments(updatedSearchedComments);
      }

      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRentStatus = async (service) => {
    service.hoanThanh = !service.hoanThanh;
    try {
      const response = await capNhatThueCongViec(service, token);
      if (response.statusCode !== 200) {
        message.error(response.content);
        return;
      }
      message.success(`Dịch vụ ${service.id} đã được thay đổi trạng thái`);
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFindCommentByJobId = async () => {
    try {
      const response = await timBinhLuanTheoId(searchJobId);
      setSearchedComments(response);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const showAddJobForm = () => {
    setIsAddJobVisible(true);
  };

  const showAddCategoryForm = () => {
    setIsAddCategoryVisible(true);
  };

  const handleAddJobFinish = async (values) => {
    try {
      if (fileList.length > 0) {
        values.hinhAnh = fileList[0].thumbUrl;
      } else {
        values.hinhAnh = null;
      }
      const response = await themJob(values, token);
      if (response.statusCode !== 201) {
        message.error(response.content);
        return;
      }
      message.success("Công việc đã được thêm");
      setIsAddJobVisible(false);
      jobForm.resetFields();
      fetchJobs();
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const handleAddCategoryFinish = async (values) => {
    console.log(token);
    try {
      const response = await themLoaiCongViec(values, token);
      if (response.statusCode !== 201) {
        message.error(response.content);
        return;
      }
      message.success("Loại công việc đã được thêm");
      setIsAddCategoryVisible(false);
      categoryForm.resetFields();
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const AddJobForm = () => {
    const handleUploadChange = ({ fileList }) => {
      setFileList(fileList);
    };

    return (
      <Modal
        title="Thêm công việc"
        visible={isAddJobVisible}
        onCancel={() => setIsAddJobVisible(false)}
        footer={null}
      >
        <Form form={jobForm} layout="vertical" onFinish={handleAddJobFinish}>
          <Form.Item
            label="Tên công việc"
            name="tenCongViec"
            rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            rules={[{ required: true, message: "Vui lòng tải lên hình ảnh" }]}
          >
            <Upload
              name="logo"
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả ngắn"
            name="moTaNgan"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm công việc
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const AddCategoryForm = () => (
    <Modal
      title="Thêm loại công việc"
      visible={isAddCategoryVisible}
      onCancel={() => setIsAddCategoryVisible(false)}
      footer={null}
    >
      <Form
        form={categoryForm}
        layout="vertical"
        onFinish={handleAddCategoryFinish}
      >
        <Form.Item
          label="Tên loại công việc"
          name="tenLoaiCongViec"
          rules={[
            { required: true, message: "Vui lòng nhập tên loại công việc" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm loại công việc
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );

  const UsersTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Table
          dataSource={users}
          pagination={{ showSizeChanger: true }}
          style={{ backgroundColor: "#fff", color: "#000" }}
          rowKey="id"
        >
          <Table.Column
            title="Avatar"
            dataIndex="avatar"
            key="avatar"
            render={(avatar) => <Avatar src={avatar} />}
          />
          <Table.Column title="Tên" dataIndex="name" key="name" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column
            title="Giới tính"
            dataIndex="gender"
            key="gender"
            render={(gender) => (gender ? "Nam" : "Nữ")}
          />
          <Table.Column title="Số điện thoại" dataIndex="phone" key="phone" />
          <Table.Column title="Vai trò" dataIndex="role" key="role" />
          <Table.Column
            title="Hành động"
            key="action"
            render={(text, record) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDeleteUser(record.id)}
                  type="default"
                  danger
                >
                  Xoá
                </Button>
                <Button type="primary" onClick={() => handleChangeRole(record)}>
                  Cập nhật role {record.role === "ADMIN" ? "USER" : "ADMIN"}
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
    </Content>
  );

  const JobsTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Button
          type="primary"
          ghost
          style={{ marginBottom: 16 }}
          onClick={showAddJobForm}
        >
          Thêm công việc
        </Button>
        <Table
          dataSource={jobs}
          pagination={{ showSizeChanger: true }}
          style={{ backgroundColor: "#fff", color: "#000" }}
          rowKey="id"
        >
          <Table.Column
            title="Tên công việc"
            dataIndex="tenCongViec"
            key="tenCongViec"
          />
          <Table.Column
            title="Hình ảnh"
            dataIndex="hinhAnh"
            key="hinhAnh"
            render={(hinhAnh) => <Avatar src={hinhAnh} />}
          />
          <Table.Column title="ID công việc" dataIndex="id" key="id" />
          <Table.Column
            title="Chi tiết loại"
            dataIndex="moTaNgan"
            key="moTaNgan"
          />
          <Table.Column
            title="Hành động"
            key="action"
            render={(text, record) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDeleteJob(record.id)}
                  type="default"
                  danger
                  style={{ marginRight: 8 }}
                >
                  Xoá
                </Button>
                <a target="_blank" href={pagePaths.detail(record.id)}>
                  <Button type="primary">Chi tiết</Button>
                </a>
              </div>
            )}
          />
        </Table>
      </div>
      <AddJobForm />
    </Content>
  );

  const CategoriesTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Button
          type="primary"
          ghost
          style={{ marginBottom: 16 }}
          onClick={showAddCategoryForm}
        >
          Thêm loại công việc
        </Button>
        <Table
          dataSource={categories}
          pagination={{ showSizeChanger: true }}
          style={{ backgroundColor: "#fff", color: "#000" }}
          rowKey="id"
        >
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column
            title="Tên loại công việc"
            dataIndex="tenLoaiCongViec"
            key="tenLoaiCongViec"
          />
          <Table.Column
            title="Hành động"
            key="action"
            render={(text, record) => (
              <div className="flex gap-2">
                <Button type="primary">
                  <a target="_blank" href={pagePaths.categories(record.id)}>
                    Chi tiết
                  </a>
                </Button>
                <Button
                  onClick={() => handleDeleteCategory(record.id)}
                  type="default"
                  danger
                >
                  Xoá
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
      <AddCategoryForm />
    </Content>
  );

  const ServicesTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Table
          dataSource={services}
          pagination={{ showSizeChanger: true }}
          style={{ backgroundColor: "#fff", color: "#000" }}
          rowKey="id"
        >
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column
            title="Mã công việc"
            dataIndex="maCongViec"
            key="maCongViec"
          />
          <Table.Column
            title="Mã người thuê"
            dataIndex="maNguoiThue"
            key="maNguoiThue"
          />
          <Table.Column title="Ngày thuê" dataIndex="ngayThue" key="ngayThue" />
          <Table.Column
            title="Trạng thái"
            dataIndex="hoanThanh"
            key="hoanThanh"
            render={(hoanThanh) =>
              hoanThanh ? "Đã hoàn thành" : "Chưa hoàn thành"
            }
          />
          <Table.Column
            title="Hành động"
            key="action"
            render={(text, record) => (
              <Button
                onClick={() => handleChangeRentStatus(record)}
                type="primary"
              >
                Đánh dấu là{" "}
                {record.hoanThanh ? "Chưa hoàn thành" : "Đã hoàn thành"}
              </Button>
            )}
          />
        </Table>
      </div>
    </Content>
  );
  const CommentsTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Nhập mã công việc"
            value={searchJobId}
            onChange={(e) => setSearchJobId(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
          />
          <Button type="primary" onClick={handleFindCommentByJobId}>
            Tìm kiếm
          </Button>
        </div>
        <Table
          dataSource={searchedComments.length > 0 ? searchedComments : comments}
          pagination={{ showSizeChanger: true }}
          style={{ backgroundColor: "#fff", color: "#000" }}
          rowKey="id"
        >
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column
            title="Mã công việc"
            dataIndex="maCongViec"
            key="maCongViec"
          />
          <Table.Column
            title="Mã người bình luận"
            dataIndex="maNguoiBinhLuan"
            key="maNguoiBinhLuan"
          />
          <Table.Column
            title="Ngày bình luận"
            dataIndex="ngayBinhLuan"
            key="ngayBinhLuan"
          />
          <Table.Column title="Nội dung" dataIndex="noiDung" key="noiDung" />
          <Table.Column
            title="Số sao"
            dataIndex="saoBinhLuan"
            key="saoBinhLuan"
          />
          <Table.Column
            title="Hành động"
            key="action"
            render={(text, record) => (
              <Button
                onClick={() => handleDeleteComment(record.id)}
                type="default"
                danger
              >
                Xoá
              </Button>
            )}
          />
        </Table>
      </div>
    </Content>
  );
  const renderContent = () => {
    switch (currentTab) {
      case "1":
        return <UsersTable />;
      case "2":
        return <JobsTable />;
      case "3":
        return <CategoriesTable />;
      case "4":
        return <ServicesTable />;
      case "5":
        return <CommentsTable />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setCurrentTab(e.key)}
        >
          <Menu.Item key="1">Quản lý người dùng</Menu.Item>
          <Menu.Item key="2">Quản lý công việc</Menu.Item>
          <Menu.Item key="3">Quản lý loại công việc</Menu.Item>
          <Menu.Item key="4">Quản lý dịch vụ</Menu.Item>
          <Menu.Item key="5">Quản lý bình luận</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="px-10 flex gap-2 h-full items-center">
            <Avatar src={auth?.avatar} />
            <NavLink to={pagePaths.profile}>{auth?.email}</NavLink>
          </div>
        </Header>
        {renderContent()}
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
