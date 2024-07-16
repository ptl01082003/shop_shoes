import { Button, Form, FormProps, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import SizeService from "../services/SizeApi";

type FieldType = {
  sizeName?: string;
};

export default function SizesPage() {
  const [lstSizes, setLstSizes] = useState<any>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });

  // table code start
  const columns = [
    {
      title: "ID",
      dataIndex: "sizeId",
      key: "sizeId",
    },
    {
      title: "Màu sắc",
      dataIndex: "sizeName",
      key: "sizeName",
    },
    {
      render: (_: any, record: any) => {
        return (
          <div className="flex space-x-4">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                editSizeItems(record);
              }}
            >
              SỬA
            </Button>
            <Button
              size="large"
              type="dashed"
              onClick={() => {
                deleteSizeItems(record);
              }}
            >
              XÓA
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const getSizes = await SizeService.getSizes();
      if (Array.isArray(getSizes.data) && getSizes.data.length > 0) {
        setLstSizes(getSizes?.data);
      }
    })();
  }, [shouldRender]);

  const deleteSizeItems = async (record: any) => {
    const res: any = await SizeService.deleteSize(record.sizeId);
    if (res.code === 0) {
      setShouldRender((x) => !x);
    }
  };

  const editSizeItems = async (record: any) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await SizeService.createSize(values);
    if (res.code === 0) {
      setOpenCreateModal(false);
      setShouldRender((x) => !x);
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await SizeService.updateSize(
      openEditModal?.data?.sizeId,
      values
    );
    if (res.code === 0) {
      setOpenEditModal(undefined);
      setShouldRender((x) => !x);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          THÊM MỚI
        </Button>
      </div>
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={lstSizes}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title=""
        centered
        closable
        open={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => {
          setOpenCreateModal(false);
        }}
        footer={false}
        width={750}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="sizeName"
            name="sizeName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Form sửa  */}
      <Modal
        title=""
        centered
        closable
        open={openEditModal?.open}
        destroyOnClose={true}
        onCancel={() => {
          setOpenEditModal(undefined);
        }}
        footer={false}
        width={750}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal?.data}
          onFinish={onEditFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="sizeName"
            name="sizeName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
