/**@jsxImportSource @emotion/react */

import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Space,
  Table,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import PromotionService from "../services/PromotionApi";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { PROMOTIONS_STATUS } from "../constants/constants";
import dayjs from "dayjs";
const { Option } = Select;

type FieldType = {
  name?: string;
  discountPrice?: number;
  startDay?: moment.Moment;
  endDay?: moment.Moment;
  status?: string;
  productId?: number;
};

export default function PromotionsPage() {
  const [lstPromotions, setLstPromotions] = useState<any[]>([]);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
    },
    {
      title: "Start Day",
      dataIndex: "startDay",
      key: "startDay",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "End Day",
      dataIndex: "endDay",
      key: "endDay",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => editPromotionItems(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deletePromotionItems(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const getPromotions = await PromotionService.getPromotions();
      setLstPromotions(getPromotions?.data || []);
    })();
  }, [shouldRender]);

  const deletePromotionItems = async (record: any) => {
    const res: any = await PromotionService.deletePromotion(record.promotionId);
    if (res.code === 0) {
      message.success("Promotion deleted successfully");
      setShouldRender((x) => !x);
    } else {
      message.error("Failed to delete promotion");
    }
  };

  const editPromotionItems = async (record: any) => {
    setOpenEditModal({
      open: true,
      data: {
        ...record,
        startDay: moment(record.startDay),
        endDay: moment(record.endDay),
      },
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await PromotionService.createPromotion({
      ...values,
      startDay: values.startDay?.format("YYYY-MM-DD"),
      endDay: values.endDay?.format("YYYY-MM-DD"),
    });
    if (res.code === 0) {
      message.success("Promotion created successfully");
      setOpenCreateModal(false);
      setShouldRender((x) => !x);
    } else {
      message.error("Failed to create promotion");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await PromotionService.updatePromotion({
      ...values,
      promotionId: openEditModal?.data?.promotionId,
    });
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
          ADD NEW
        </Button>
      </div>
      <div css={tableCustomizeStyle} className="table-responsive">
        <Table
          columns={columns}
          dataSource={lstPromotions}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Discount Price"
            name="discountPrice"
            rules={[{ required: true, message: "Discount Price is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Start Day"
            name="startDay"
            rules={[{ required: true, message: "Start Day is required!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="End Day"
            name="endDay"
            rules={[{ required: true, message: "End Day is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required!" }]}
          >
            <Select>
              <Option value={PROMOTIONS_STATUS.ISACTIVE}>ISACTIVE</Option>
              <Option value={PROMOTIONS_STATUS.PERCENT}>PERCENT</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Product ID"
            name="productId"
            rules={[{ required: true, message: "Product ID is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add New
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Form sửa */}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Discount Price"
            name="discountPrice"
            rules={[{ required: true, message: "Discount Price is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Start Day"
            name="startDay"
            rules={[{ required: true, message: "Start Day is required!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm"
              defaultValue={dayjs(openEditModal?.data?.startDay).toDate()}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="End Day"
            name="endDay"
            rules={[{ required: true, message: "End Day is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required!" }]}
          >
            <Select>
              <Option value={PROMOTIONS_STATUS.ISACTIVE}>ISACTIVE</Option>
              <Option value={PROMOTIONS_STATUS.PERCENT}>PERCENT</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Product ID"
            name="productId"
            rules={[{ required: true, message: "Product ID is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
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
