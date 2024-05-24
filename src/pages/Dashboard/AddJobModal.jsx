import { Modal, Form, Input, InputNumber } from "antd";

const AddJobModal = ({ isModalOpen, onCancel, onOk }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onOk(values)
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Thêm công việc mới"
      okText="Thêm"
      cancelText="Huỷ"
      onCancel={onCancel}
      onOk={handleSubmit}
      open={isModalOpen}
    >
      <Form form={form} layout="vertical" className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: "Vui lòng nhập ID" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="tenCongViec"
            label="Tên công việc"
            rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="danhGia"
            label="Đánh giá"
            rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="giaTien"
            label="Giá tiền"
            rules={[{ required: true, message: "Vui lòng nhập giá tiền" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="nguoiTao"
            label="Người tạo"
            rules={[{ required: true, message: "Vui lòng nhập người tạo" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="hinhAnh"
            label="Hình ảnh"
            rules={[{ required: true, message: "Vui lòng nhập hình ảnh" }]}
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="moTa"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="maChiTietLoaiCongViec"
            label="Mã chi tiết loại công việc"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã chi tiết loại công việc",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="moTaNgan"
            label="Mô tả ngắn"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn" }]}
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <Form.Item
            name="saoCongViec"
            label="Sao công việc"
            rules={[{ required: true, message: "Vui lòng nhập sao công việc" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddJobModal;
