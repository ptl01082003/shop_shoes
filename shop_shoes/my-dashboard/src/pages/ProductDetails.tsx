import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  InputNumber,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import ProductDetailsService, {
  ProductDetail,
} from "../services/ProductDetailApi";
import ProductsService from "../services/ProductApi";
import SizesService from "../services/SizeApi";
import { FormProps } from "antd/lib";

type Size = {
  sizeId: number;
  sizeName: string;
};

type Product = {
  productId: number;
  productsName: string;
};

type SizeQuantity = {
  sizeId: number;
  quantity: number;
};

type FieldType = Omit<ProductDetail, "productDetailid"> & {
  sizes?: SizeQuantity[];
};

export default function ProductDetailsPage() {
  const [lstProductDetails, setLstProductDetails] = useState<ProductDetail[]>(
    []
  );
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<{
    open: boolean;
    data: ProductDetail;
  }>({ open: false, data: {} as ProductDetail });
  const [lstproducts, setProducts] = useState<Product[]>([]);
  const [lstsizes, setSizes] = useState<Size[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await ProductsService.getProducts();
        setProducts(productResponse.data);

        const sizeResponse = await SizesService.getSizes();
        setSizes(sizeResponse.data);

        const productDetailsResponse =
          await ProductDetailsService.getAllProductDetails();
        setLstProductDetails(productDetailsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [shouldRender]);

  const deleteProductDetail = async (record: ProductDetail) => {
    try {
      const res = await ProductDetailsService.deleteProductDetail(
        record.productDetailid
      );
      if (res) {
        setShouldRender((prev) => !prev);
        message.success("Xóa chi tiết sản phẩm thành công!");
      }
    } catch (error) {
      message.error("Xóa chi tiết sản phẩm thất bại!");
    }
  };

  const editProductDetail = (record: ProductDetail) => {
    setOpenEditModal({ open: true, data: record });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const productDetailData: Omit<ProductDetail, "productDetailid"> = {
      productDetailname: values.productDetailname || "",
      productDetaildescription: values.productDetaildescription || "",
      productId: values.productId || 0,
      sizes: values.sizes || [],
    };

    try {
      const res = await ProductDetailsService.createProductDetail(
        productDetailData
      );
      if (res) {
        setOpenCreateModal(false);
        setShouldRender((prev) => !prev);
        message.success("Thêm chi tiết sản phẩm thành công!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm chi tiết sản phẩm.");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const productDetailData: Partial<ProductDetail> = {
      productDetailname: values.productDetailname || "",
      productDetaildescription: values.productDetaildescription || "",
      productId: values.productId || 0,
      sizes: values.sizes || [],
    };

    try {
      const res = await ProductDetailsService.updateProductDetail(
        openEditModal.data.productDetailid,
        productDetailData
      );
      if (res) {
        setOpenEditModal({ open: false, data: {} as ProductDetail });
        setShouldRender((prev) => !prev);
        message.success("Cập nhật chi tiết sản phẩm thành công!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật chi tiết sản phẩm.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productDetailid",
      key: "productDetailid",
    },
    {
      title: "Tên chi tiết sản phẩm",
      dataIndex: "productDetailname",
      key: "productDetailname",
    },
    {
      title: "Mô tả chi tiết sản phẩm",
      dataIndex: "productDetaildescription",
      key: "productDetaildescription",
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      render: (sizes: SizeQuantity[]) =>
        sizes.map((size) => (
          <div key={size.sizeId}>
            Size: {size.sizeId}, Quantity: {size.quantity}
          </div>
        )),
    },
    {
      key: "actions",
      render: (_: any, record: ProductDetail) => (
        <div className="flex space-x-4">
          <Button
            size="large"
            type="primary"
            onClick={() => editProductDetail(record)}
          >
            SỬA
          </Button>
          <Button
            size="large"
            type="dashed"
            onClick={() => deleteProductDetail(record)}
          >
            XÓA
          </Button>
        </div>
      ),
    },
  ];

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
          dataSource={lstProductDetails}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Thêm Chi Tiết Sản Phẩm"
        centered
        closable
        open={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => setOpenCreateModal(false)}
        footer={false}
        width={750}
      >
        <Form
          name="create"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ sizes: [{ sizeId: 0, quantity: 0 }] }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên chi tiết sản phẩm"
            name="productDetailname"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả chi tiết sản phẩm"
            name="productDetaildescription"
            rules={[{ required: true, message: "Mô tả không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            name="productId"
            rules={[
              { required: true, message: "Sản phẩm không được để trống!" },
            ]}
          >
            <Select>
              {lstproducts.map((product: any) => (
                <Select.Option key={product.id} value={product.id}>
                  {product.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "sizeId"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn kích thước!",
                        },
                      ]}
                    >
                      <Select placeholder="Chọn kích thước">
                        {lstsizes.map((size) => (
                          <Select.Option key={size.sizeId} value={size.sizeId}>
                            {size.sizeName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[
                        { required: true, message: "Vui lòng nhập số lượng!" },
                      ]}
                    >
                      <InputNumber placeholder="Số lượng" />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)}>
                      Xóa
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({ sizeId: 0, quantity: 0 })}
                  >
                    Thêm kích thước
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa Chi Tiết Sản Phẩm"
        centered
        closable
        open={openEditModal.open}
        destroyOnClose={true}
        onCancel={() =>
          setOpenEditModal({ open: false, data: {} as ProductDetail })
        }
        footer={false}
        width={750}
      >
        <Form
          name="edit"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal.data}
          onFinish={onEditFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên chi tiết sản phẩm"
            name="productDetailname"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả chi tiết sản phẩm"
            name="productDetaildescription"
            rules={[{ required: true, message: "Mô tả không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            name="productId"
            rules={[
              { required: true, message: "Sản phẩm không được để trống!" },
            ]}
          >
            <Select placeholder="Chọn sản phẩm">
              {lstproducts.map((product) => (
                <Select.Option
                  key={product.productId}
                  value={product.productId}
                >
                  {product.productsName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "sizeId"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn kích thước!",
                        },
                      ]}
                    >
                      <Select placeholder="Chọn kích thước">
                        {lstsizes.map((size) => (
                          <Select.Option key={size.sizeId} value={size.sizeId}>
                            {size.sizeName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[
                        { required: true, message: "Vui lòng nhập số lượng!" },
                      ]}
                    >
                      <InputNumber placeholder="Số lượng" />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)}>
                      Xóa
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({ sizeId: 0, quantity: 0 })}
                  >
                    Thêm kích thước
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
