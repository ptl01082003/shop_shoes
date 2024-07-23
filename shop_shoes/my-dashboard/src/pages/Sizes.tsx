/**@jsxImportSource @emotion/react */

import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import SizeService from "../services/SizeApi";
import { tableCustomizeStyle } from "../styles/styles";

type SizeType = {
  sizeID?: number;
  sizeName?: string;
};

const SizePage: React.FC = () => {
  const [lstSizes, setLstSizes] = useState<SizeType[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<{
    open: boolean;
    data: SizeType;
  }>({
    open: false,
    data: {},
  });

  useEffect(() => {
    fetchSizes();
  }, [shouldRender]);

  const fetchSizes = async () => {
    try {
      const response = await SizeService.getSizes();
      if (response.code === 0) {
        setLstSizes(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch sizes:", error);
    }
  };

  const deleteSize = async (record: SizeType) => {
    try {
      const response = await SizeService.deleteSize(record.sizeID!);
      if (response.code === 0) {
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to delete size:", error);
    }
  };

  const editSize = (record: SizeType) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinishCreate = async (values: SizeType) => {
    try {
      const response = await SizeService.createSize(values);
      if (response.code === 0) {
        setOpenCreateModal(false);
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to create size:", error);
    }
  };

  const onFinishEdit = async (values: SizeType) => {
    try {
      const response = await SizeService.updateSize(
        openEditModal.data.sizeID!,
        values
      );
      if (response.code === 0) {
        setOpenEditModal({ open: false, data: {} });
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to update size:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "sizeID",
      key: "sizeID",
    },
    {
      title: "Name",
      dataIndex: "sizeName",
      key: "sizeName",
    },
    {
      title: "Actions",
      render: (_: any, record: SizeType) => (
        <div className="flex space-x-4">
          <Button size="large" type="primary" onClick={() => editSize(record)}>
            Edit
          </Button>
          <Button size="large" type="dashed" onClick={() => deleteSize(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          size="large"
          type="primary"
          onClick={() => setOpenCreateModal(true)}
        >
          Add New
        </Button>
      </div>
      <div css={tableCustomizeStyle} className="table-responsive">
        <Table
          columns={columns}
          dataSource={lstSizes}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Create Size"
        centered
        visible={isOpenCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createSizeForm"
          onFinish={onFinishCreate}
          layout="horizontal"
        >
          <Form.Item
            label="Name"
            name="sizeName"
            rules={[{ required: true, message: "Please input the size name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Size"
        centered
        visible={openEditModal.open}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editSizeForm"
          initialValues={openEditModal.data}
          onFinish={onFinishEdit}
          layout="horizontal"
        >
          <Form.Item
            label="Name"
            name="sizeName"
            rules={[{ required: true, message: "Please input the size name!" }]}
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
};

export default SizePage;
