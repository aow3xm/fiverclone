import { Layout, Menu, Table, Input, Button, Modal, Form, Select, Switch, Avatar } from 'antd';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  // Các state và hàm xử lý cho từng tính năng
  // ...
  const auth = useSelector((state)=>state.auth?.info)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Quản lý người dùng</Menu.Item>
          <Menu.Item key="2">Quản lý công việc</Menu.Item>
          <Menu.Item key="3">Quản lý loại công việc</Menu.Item>
          <Menu.Item key="4">Quản lý dịch vụ</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Avatar>{auth?.avatar}</Avatar>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* Quản lý người dùng */}
            <Input.Search placeholder="Tìm kiếm người dùng..." style={{ marginBottom: 16 }} />
            <Button type="primary" ghost style={{ marginBottom: 16 }}>Thêm quản trị viên</Button>
            <Table 
              // dataSource={userData} 
              // columns={userColumns} 
              pagination={{
                // ...userPagination,
                showSizeChanger: true
              }}
              style={{ backgroundColor: '#001529', color: '#fff' }}
            />

            {/* Quản lý công việc */}
            <Table 
              // dataSource={taskData} 
              // columns={taskColumns} 
              style={{ backgroundColor: '#001529', color: '#fff' }}
            />
            <Modal 
              title="Chỉnh sửa công việc"
              // visible={taskModalVisible}
              // onOk={handleTaskModalOk}
              // onCancel={handleTaskModalCancel}
              okButtonProps={{ ghost: true }}
              cancelButtonProps={{ ghost: true }}
            >
              <Form>
                <Form.Item label="Tiêu đề">
                  <Input />
                </Form.Item>
                <Form.Item label="Người được giao">
                  <Select 
                    // options={userOptions} 
                  />
                </Form.Item>
                {/* Các trường khác của form */}
              </Form>
            </Modal>

            {/* Quản lý loại công việc */}
            <Table 
              // dataSource={taskTypeData}
              // columns={taskTypeColumns}
              style={{ backgroundColor: '#001529', color: '#fff' }}
            />
            <Button 
              // onClick={handleAddTaskType}
              ghost
            >
              Thêm loại công việc
            </Button>

            {/* Quản lý dịch vụ */}
            <Table 
              // dataSource={serviceData}
              style={{ backgroundColor: '#001529', color: '#fff' }}
            >
              <Table.Column title="Dịch vụ" dataIndex="name" key="name" />
              <Table.Column
                title="Kích hoạt"
                key="isActive"
                render={(text, record) => (
                  <Switch 
                    // checked={record.isActive}
                    // onChange={() => handleToggleServiceStatus(record)}
                  />
                )}
              />
              <Table.Column
                title="Hành động"
                key="action"
                render={(text, record) => (
                  <Button 
                    // onClick={() => handleServiceConfig(record)}
                    ghost
                  >
                    Cấu hình
                  </Button>
                )}
              />
            </Table>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
