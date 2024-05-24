import { Layout, Menu, Table, Input, Button, Avatar, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  layDanhSachJob,
  layDanhSachUser,
  xoaUser,
  xoaJob,
} from "../../services/adminService";
import { NavLink } from "react-router-dom";
import { pagePaths } from "../../paths";
import AddJobModal from "./AddJobModal";

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    fetchUsers();
    fetchJobs();
  }, [fetchUsers, fetchJobs]);

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
      console.error("Failed to delete user:", error);
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
      console.error("Failed to delete job:", error);
    }
  };

  const handleAddJob = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    console.log(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const UsersTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Button type="primary" ghost style={{ marginBottom: 16 }}>
          Thêm quản trị viên
        </Button>
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
              <Button
                onClick={() => handleDeleteUser(record.id)}
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

  const JobsTable = () => (
    <Content style={{ margin: "16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Button
          onClick={handleAddJob}
          type="primary"
          ghost
          style={{ marginBottom: 16 }}
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
    </Content>
  );

  const renderContent = () => {
    switch (currentTab) {
      case "1":
        return <UsersTable />;
      case "2":
        return <JobsTable />;
      case "3":
        return (
          <Content style={{ margin: "16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <h2>Quản lý loại công việc</h2>
              {/* Thêm nội dung quản lý loại công việc ở đây */}
            </div>
          </Content>
        );
      case "4":
        return (
          <Content style={{ margin: "16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <h2>Quản lý dịch vụ</h2>
              {/* Thêm nội dung quản lý dịch vụ ở đây */}
            </div>
          </Content>
        );
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
      <AddJobModal
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Layout>
  );
};

export default AdminDashboard;
