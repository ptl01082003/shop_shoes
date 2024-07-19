import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import MaterialService from "../services/MaterialApi";

// Các biểu tượng cho nút sửa và xóa
const deletebtn = [
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
      fill="#111827"
      className="fill-danger"
    ></path>
  </svg>,
];

const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];

type MaterialType = {
  materialID?: number;
  materialName?: string;
};

export default function MaterialPage() {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<{
    open: boolean;
    data: MaterialType;
  }>({
    open: false,
    data: {},
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "materialID",
      key: "materialID",
    },
    {
      title: "Tên Vật Liệu",
      dataIndex: "materialName",
      key: "materialName",
    },
    {
      render: (_: any, record: MaterialType) => {
        return (
          <div className="flex space-x-4">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                editMaterialItems(record);
              }}
            >
              {pencil} Edit
            </Button>
            <Button
              size="large"
              type="dashed"
              onClick={() => {
                deleteMaterialItems(record);
              }}
            >
              {deletebtn} Delete
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await MaterialService.getMaterials();
      if (response.code === 0) {
        setMaterials(response.data);
      }
    })();
  }, [shouldRender]);

  const deleteMaterialItems = async (record: MaterialType) => {
    const response = await MaterialService.deleteMaterial(record.materialID!);
    if (response.code === 0) {
      setShouldRender((prev) => !prev);
    }
  };

  const editMaterialItems = (record: MaterialType) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinishCreate = async (values: MaterialType) => {
    const response = await MaterialService.createMaterial(values);
    if (response.code === 0) {
      setOpenCreateModal(false);
      setShouldRender((prev) => !prev);
    }
  };

  const onFinishEdit = async (values: MaterialType) => {
    const response = await MaterialService.updateMaterial(
      openEditModal.data.materialID!,
      values
    );
    if (response.code === 0) {
      setOpenEditModal({ open: false, data: {} });
      setShouldRender((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          Add New
        </Button>
      </div>
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={materials}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Create Material"
        centered
        visible={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createMaterial"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishCreate}
          autoComplete="off"
        >
          <Form.Item
            label="Material Name"
            name="materialName"
            rules={[
              { required: true, message: "Please input the material name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Material"
        centered
        visible={openEditModal.open}
        destroyOnClose={true}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editMaterial"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal.data}
          onFinish={onFinishEdit}
          autoComplete="off"
        >
          <Form.Item
            label="Material Name"
            name="materialName"
            rules={[
              { required: true, message: "Please input the material name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
