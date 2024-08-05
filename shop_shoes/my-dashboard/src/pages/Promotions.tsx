import { Button, Form, FormProps, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import PromotionsService from "../services/PromotionAip";

type FieldType = {
  promotionName?: string;
  promotionDiscount?: number;
  startDay?: string;
  endDay?: string;
  status?: boolean;
};

export default function PromotionsPage() {
  const [lstPromotions, setLstPromotions] = useState<any>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "promotionId",
      key: "promotionId",
    },
    {
      title: "Tên khuyến mãi",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Giảm giá",
      dataIndex: "promotionDiscount",
      key: "promotionDiscount",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDay",
      key: "startDay",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDay",
      key: "endDay",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      render: (_: any, record: any) => {
        return (
          <div className="flex space-x-4">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                editPromotionItems(record);
              }}
            >
              SỬA
            </Button>
            <Button
              size="large"
              type="dashed"
              onClick={() => {
                deletePromotionItems(record);
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
      try {
        const getPromotions = await PromotionsService.getPromotions();
        console.log(getPromotions); // Kiểm tra dữ liệu nhận được từ API
        if (Array.isArray(getPromotions) && getPromotions.length > 0) {
          setLstPromotions(getPromotions);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error); // Kiểm tra lỗi nếu có
      }
    })();
  }, [shouldRender]);

  const deletePromotionItems = async (record: any) => {
    const res: any = await PromotionsService.deletePromotion(
      record.promotionId
    );
    if (res.code === 0) {
      setShouldRender((x) => !x);
    }
  };

  const editPromotionItems = async (record: any) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await PromotionsService.createPromotion(values);
    if (res.code === 0) {
      setOpenCreateModal(false);
      setShouldRender((x) => !x);
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await PromotionsService.updatePromotion(
      openEditModal?.data?.promotionId,
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
          dataSource={lstPromotions}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Thêm mới khuyến mãi"
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
            label="Tên khuyến mãi"
            name="promotionName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Giảm giá"
            name="promotionDiscount"
            rules={[
              { required: true, message: "Giảm giá không được để trống!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày bắt đầu"
            name="startDay"
            rules={[
              { required: true, message: "Ngày bắt đầu không được để trống!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày kết thúc"
            name="endDay"
            rules={[
              { required: true, message: "Ngày kết thúc không được để trống!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[
              { required: true, message: "Trạng thái không được để trống!" },
            ]}
          >
            <Select>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Form sửa */}
      <Modal
        title="Chỉnh sửa khuyến mãi"
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
            label="Tên khuyến mãi"
            name="promotionName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Giảm giá"
            name="promotionDiscount"
            rules={[
              { required: true, message: "Giảm giá không được để trống!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày bắt đầu"
            name="startDay"
            rules={[
              { required: true, message: "Ngày bắt đầu không được để trống!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày kết thúc"
            name="endDay"
            rules={[
              { required: true, message: "Ngày kết thúc không được để trống!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[
              { required: true, message: "Trạng thái không được để trống!" },
            ]}
          >
            <Select>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
