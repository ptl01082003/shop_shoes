// src/pages/ProductLinePage.tsx

import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Table,
  message,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import ProductLineService from "../services/ProductLineApi";
import BrandService from "../services/BrandApi";
import { error } from "console";

type FieldType = {
  productLineName?: string;
  brandId?: number;
};

export default function ProductLinePage() {
  const [lstProductLines, setLstProductLines] = useState<any>([]);
  const [lstBrands, setLstBrands] = useState<any>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });

  useEffect(() => {
    (async () => {
      try {
        const getProductLines = await ProductLineService.getProductLines();
        if (Array.isArray(getProductLines) && getProductLines.length > 0) {
          setLstProductLines(getProductLines);
          console.log(getProductLines);
        } else {
          message.error("Không thể tải danh sách dòng sản phẩm.");
        }

        const getBrands = await BrandService.getBrands();
        if (Array.isArray(getBrands) && getBrands.length > 0) {
          setLstBrands(getBrands);
          console.log(getBrands);
        } else {
          message.error("Không thể tải danh sách thương hiệu.");
        }
      } catch (error) {
        console.error("Error loading data");
        message.error("Có lỗi xảy ra khi tải dữ liệu.");
      }
    })();
  }, [shouldRender]);

  const columns = [
    {
      title: "ID",
      dataIndex: "productLineID",
      key: "productLineID",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productLineName",
      key: "productLineName",
    },
    {
      title: "Brand ID",
      dataIndex: "brandId",
      key: "brandId",
      render: (brandId: number) => {
        const brand = lstBrands.find((brand: any) => brand.id === brandId);
        return <span>{brand ? brand.name : "-"}</span>;
      },
    },
    {
      render: (_: any, record: any) => (
        <div className="flex space-x-4">
          <Button
            size="large"
            type="primary"
            onClick={() => editProductLineItems(record)}
          >
            SỬA
          </Button>
          <Button
            size="large"
            type="dashed"
            onClick={() => deleteProductLineItems(record)}
          >
            XÓA
          </Button>
        </div>
      ),
    },
  ];

  const deleteProductLineItems = async (record: any) => {
    try {
      console.log("Deleting product line:", record.productLineID);
      const res: any = await ProductLineService.deleteProductLine(
        record.productLineID
      );
      console.log("deleteProductLineItems result:", res);
      if (res.status === 1) {
        setShouldRender((x) => !x);
        message.success("Xóa dòng sản phẩm thành công!");
      } else {
        message.error("Có lỗi xảy ra khi xóa dòng sản phẩm.");
      }
    } catch (error) {
      console.error("Delete product line error", error);
      message.error("Có lỗi xảy ra khi xóa dòng sản phẩm.");
    }
  };

  const editProductLineItems = async (record: any) => {
    console.log("Editing product line:", record);
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    try {
      console.log("Creating product line:", values);
      const res = await ProductLineService.createProductLine(values);
      console.log("onFinish result:", res);
      if (res.status === 1) {
        setOpenCreateModal(false);
        setShouldRender((x) => !x);
        message.success("Thêm dòng sản phẩm mới thành công!");
      } else {
        message.error("Có lỗi xảy ra khi thêm dòng sản phẩm mới.");
      }
    } catch (error) {
      console.error("Create product line error", error);
      message.error("Có lỗi xảy ra khi thêm dòng sản phẩm mới.");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    try {
      console.log("Updating product line:", values);
      const res = await ProductLineService.updateProductLine(
        openEditModal?.data?.productLineID,
        values
      );
      console.log("onEditFinish result:", res);
      if (res.status === 1) {
        setOpenEditModal(undefined);
        setShouldRender((x) => !x);
        message.success("Cập nhật dòng sản phẩm thành công!");
      } else {
        message.error("Có lỗi xảy ra khi cập nhật dòng sản phẩm.");
      }
    } catch (error) {
      console.error("Update product line error", error);
      message.error("Có lỗi xảy ra khi cập nhật dòng sản phẩm.");
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
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={lstProductLines}
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
        onCancel={() => setOpenCreateModal(false)}
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
          <Form.Item
            label="Tên dòng sản phẩm"
            name="productLineName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand ID"
            name="brandId"
            rules={[
              { required: true, message: "Brand ID không được để trống!" },
            ]}
          >
            <Select>
              {lstBrands.map((brand: any) => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title=""
        centered
        closable
        open={openEditModal?.open}
        destroyOnClose={true}
        onCancel={() => setOpenEditModal(undefined)}
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
          <Form.Item
            label="Tên dòng sản phẩm"
            name="productLineName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand ID"
            name="brandId"
            rules={[
              { required: true, message: "Brand ID không được để trống!" },
            ]}
          >
            <Select>
              {lstBrands.map((brand: any) => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
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
