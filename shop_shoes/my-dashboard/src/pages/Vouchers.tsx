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
import VoucherService from "../services/VoucherApi";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Vouchers_STATUS, Vouchers_TYPE } from "../constants/constants";

const { Option } = Select;

type FieldType = {
  code?: string;
  description?: string;
  valueOrder?: number;
  disscoutMax?: number;
  startDay?: moment.Moment;
  endDay?: moment.Moment;
  quantity?: number;
  status?: string;
  typeValue?: string;
  productId?: number;
};

export default function VouchersPage() {
  const [lstVouchers, setLstVouchers] = useState<any[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "voucherId",
      key: "voucherId",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Value Order",
      dataIndex: "valueOrder",
      key: "valueOrder",
    },
    {
      title: "Discount Max",
      dataIndex: "disscoutMax",
      key: "disscoutMax",
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type Value",
      dataIndex: "typeValue",
      key: "typeValue",
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
            onClick={() => editVoucherItems(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteVoucherItems(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const getVouchers = await VoucherService.getVouchers();
      setLstVouchers(getVouchers?.data || []);
    })();
  }, [shouldRender]);

  const deleteVoucherItems = async (record: any) => {
    const res: any = await VoucherService.deleteVoucher(record.voucherId);
    if (res.code === 0) {
      message.success("Voucher deleted successfully");
      setShouldRender((x) => !x);
    } else {
      message.error("Failed to delete voucher");
    }
  };

  const editVoucherItems = async (record: any) => {
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
    const res = await VoucherService.createVoucher({
      ...values,
      startDay: values.startDay?.format("YYYY-MM-DD"),
      endDay: values.endDay?.format("YYYY-MM-DD"),
    });
    if (res.code === 0) {
      message.success("Voucher created successfully");
      setOpenCreateModal(false);
      setShouldRender((x) => !x);
    } else {
      message.error("Failed to create voucher");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await VoucherService.updateVoucher({
      ...values,
      voucherId: openEditModal?.data?.voucherId,
      startDay: values.startDay?.format("YYYY-MM-DD"),
      endDay: values.endDay?.format("YYYY-MM-DD"),
    });
    if (res.code === 0) {
      message.success("Voucher updated successfully");
      setOpenEditModal(undefined);
      setShouldRender((x) => !x);
    } else {
      message.error("Failed to update voucher");
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
          dataSource={lstVouchers}
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
            label="Code"
            name="code"
            rules={[{ required: true, message: "Code is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Value Order"
            name="valueOrder"
            rules={[{ required: true, message: "Value Order is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Discount Max"
            name="disscoutMax"
            rules={[{ required: true, message: "Discount Max is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Start Day"
            name="startDay"
            rules={[{ required: true, message: "Start Day is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="End Day"
            name="endDay"
            rules={[{ required: true, message: "End Day is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Quantity is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required!" }]}
          >
            <Select>
              <Option value={Vouchers_STATUS.ISACTIVE}>ISACTIVE</Option>
              <Option value={Vouchers_STATUS.EXPIRED}>PERCENT</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Type Value"
            name="typeValue"
            rules={[{ required: true, message: "Type Value is required!" }]}
          >
            <Input />
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
        open={openEditModal.open}
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
          initialValues={openEditModal.data}
          onFinish={onEditFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Code"
            name="code"
            rules={[{ required: true, message: "Code is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Value Order"
            name="valueOrder"
            rules={[{ required: true, message: "Value Order is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Discount Max"
            name="disscoutMax"
            rules={[{ required: true, message: "Discount Max is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Start Day"
            name="startDay"
            rules={[{ required: true, message: "Start Day is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="End Day"
            name="endDay"
            rules={[{ required: true, message: "End Day is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Quantity is required!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required!" }]}
          >
            <Select>
              <Option value={Vouchers_STATUS.ISACTIVE}>ISACTIVE</Option>
              <Option value={Vouchers_STATUS.EXPIRED}>PERCENT</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Type Value"
            name="typeValue"
            rules={[{ required: true, message: "Type Value is required!" }]}
          >
            <Input />
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
