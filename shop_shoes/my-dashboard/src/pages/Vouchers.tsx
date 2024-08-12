/** @jsxImportSource @emotion/react */

import {
  Button,
  Form,
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
import {
  Vouchers_STATUS,
  Vouchers_TYPE,
  Voucher_RULE,
} from "../constants/constants";
import { FormProps } from "antd/lib";

const { Option } = Select;

type FieldType = {
  code?: string;
  description?: string;
  valueOrder?: number;
  disscoutMax?: number;
  startDay?: moment.Moment;
  endDay?: moment.Moment;
  quantity?: number;
  status?: Vouchers_STATUS;
  typeValue?: Vouchers_TYPE;
  ruleType?: Voucher_RULE;
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
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "valueOrder",
      key: "valueOrder",
    },
    {
      title: "Giảm giá tối đa",
      dataIndex: "disscoutMax",
      key: "disscoutMax",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDay",
      key: "startDay",
      render: (startDay: string) => moment(startDay).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDay",
      key: "endDay",
      render: (endDay: string) => moment(endDay).format("DD-MM-YYYY"),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: Vouchers_STATUS) => {
        switch (status) {
          case Vouchers_STATUS.ISACTIVE:
            return "Kích hoạt";
          case Vouchers_STATUS.EXPIRED:
            return "Hết hạn";
          case Vouchers_STATUS.UNUSED:
            return "Chưa sử dụng";
          default:
            return "Không xác định";
        }
      },
    },
    {
      title: "Loại giá trị",
      dataIndex: "typeValue",
      key: "typeValue",
      render: (typeValue: Vouchers_TYPE) => {
        switch (typeValue) {
          case Vouchers_TYPE.MONEY:
            return "Tiền";
          case Vouchers_TYPE.PERCENT:
            return "Phần trăm";
          default:
            return "Không xác định";
        }
      },
    },
    {
      title: "Quy tắc",
      dataIndex: "ruleType",
      key: "ruleType",
      render: (ruleType: Voucher_RULE) => {
        switch (ruleType) {
          case Voucher_RULE.MIN_ORDER_VALUE:
            return "Giá trị đơn hàng tối thiểu";
          case Voucher_RULE.VALID_PRODUCTS:
            return "Sản phẩm hợp lệ";
          case Voucher_RULE.USER_LEVEL:
            return "Cấp độ người dùng";
          case Voucher_RULE.ORDER_COUNT:
            return "Số đơn hàng";
          default:
            return "Không xác định";
        }
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => editVoucherItems(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteVoucherItems(record)}
          >
            Xóa
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
      setOpenEditModal({ open: false, data: {} });
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
          onClick={() => setOpenCreateModal(true)}
        >
          THÊM MỚI
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
        title="Tạo Voucher"
        centered
        closable
        open={isOpenCreateModal}
        destroyOnClose
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createVoucher"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Mã giảm giá"
            name="code"
            rules={[{ required: true, message: "Mã giảm giá là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Giá trị đơn hàng"
            name="valueOrder"
            rules={[
              { required: true, message: "Giá trị đơn hàng là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Giảm giá tối đa"
            name="disscoutMax"
            rules={[
              { required: true, message: "Giảm giá tối đa là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày bắt đầu"
            name="startDay"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày kết thúc"
            name="endDay"
            rules={[{ required: true, message: "Ngày kết thúc là bắt buộc!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
          >
            <Select>
              <Option value={Vouchers_STATUS.ISACTIVE}>Kích hoạt</Option>
              <Option value={Vouchers_STATUS.EXPIRED}>Hết hạn</Option>
              <Option value={Vouchers_STATUS.UNUSED}>Chưa sử dụng</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Loại giá trị"
            name="typeValue"
            rules={[{ required: true, message: "Loại giá trị là bắt buộc!" }]}
          >
            <Select>
              <Option value={Vouchers_TYPE.MONEY}>Tiền</Option>
              <Option value={Vouchers_TYPE.PERCENT}>Phần trăm</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Quy tắc"
            name="ruleType"
            rules={[{ required: true, message: "Quy tắc là bắt buộc!" }]}
          >
            <Select>
              <Option value={Voucher_RULE.MIN_ORDER_VALUE}>
                Giá trị đơn hàng tối thiểu
              </Option>
              <Option value={Voucher_RULE.VALID_PRODUCTS}>
                Sản phẩm hợp lệ
              </Option>
              <Option value={Voucher_RULE.USER_LEVEL}>Cấp độ người dùng</Option>
              <Option value={Voucher_RULE.ORDER_COUNT}>Số đơn hàng</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo Voucher
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa Voucher"
        centered
        closable
        open={openEditModal.open}
        destroyOnClose
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editVoucher"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
          onFinish={onEditFinish}
          autoComplete="off"
          initialValues={openEditModal.data}
        >
          <Form.Item<FieldType>
            label="Mã giảm giá"
            name="code"
            rules={[{ required: true, message: "Mã giảm giá là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Giá trị đơn hàng"
            name="valueOrder"
            rules={[
              { required: true, message: "Giá trị đơn hàng là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Giảm giá tối đa"
            name="disscoutMax"
            rules={[
              { required: true, message: "Giảm giá tối đa là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày bắt đầu"
            name="startDay"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày kết thúc"
            name="endDay"
            rules={[{ required: true, message: "Ngày kết thúc là bắt buộc!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
          >
            <Select>
              <Option value={Vouchers_STATUS.ISACTIVE}>Kích hoạt</Option>
              <Option value={Vouchers_STATUS.EXPIRED}>Hết hạn</Option>
              <Option value={Vouchers_STATUS.UNUSED}>Chưa sử dụng</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Loại giá trị"
            name="typeValue"
            rules={[{ required: true, message: "Loại giá trị là bắt buộc!" }]}
          >
            <Select>
              <Option value={Vouchers_TYPE.MONEY}>Tiền</Option>
              <Option value={Vouchers_TYPE.PERCENT}>Phần trăm</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Quy tắc"
            name="ruleType"
            rules={[{ required: true, message: "Quy tắc là bắt buộc!" }]}
          >
            <Select>
              <Option value={Voucher_RULE.MIN_ORDER_VALUE}>
                Giá trị đơn hàng tối thiểu
              </Option>
              <Option value={Voucher_RULE.VALID_PRODUCTS}>
                Sản phẩm hợp lệ
              </Option>
              <Option value={Voucher_RULE.USER_LEVEL}>Cấp độ người dùng</Option>
              <Option value={Voucher_RULE.ORDER_COUNT}>Số đơn hàng</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
