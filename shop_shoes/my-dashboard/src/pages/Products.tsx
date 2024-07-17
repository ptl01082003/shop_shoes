// src/pages/ProductPage.tsx

import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Table,
  message,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductApi";
import BrandService from "../services/BrandApi";
import StyleService from "../services/StyleApi";
import MaterialService from "../services/MaterialApi";
import OriginService from "../services/OriginApi";
type FieldType = {
  productName?: string;
  productImportPrice?: number;
  productPrice?: string;
  status?: boolean;
  display?: boolean;
  brandID?: number;
  styleID?: number;
  materialID?: number;
  originID?: number;
};

export default function ProductPage() {
  const [lstProducts, setLstProducts] = useState<any>([]);
  const [lstBrands, setLstBrands] = useState<any>([]);
  const [lstStyles, setLstStyles] = useState<any>([]);
  const [lstOrigins, setLstOrigins] = useState<any>([]);
  const [lstMaterials, setLstMaterials] = useState<any>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });
  console.log(lstBrands);
  const columns = [
    {
      title: "ID",
      dataIndex: "productsID",
      key: "productsID",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productsName",
      key: "productsName",
    },
    {
      title: "Giá Nhập",
      dataIndex: "productImportPrice",
      key: "productImportPrice",
    },
    {
      title: "Giá bán",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "productName",
      render: (status: boolean) => (
        <span>{status ? "Còn hàng" : "Hết hàng"}</span>
      ),
    },
    {
      title: "Hiển thị",
      dataIndex: "display",
      key: "display",
      render: (đisplay: boolean) => (
        <span>{đisplay ? "Hiển thị" : "Không hiển thị"}</span>
      ),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandID",
      key: "brandID",
      render: (brandID: number) => {
        const brand = lstBrands.find((brand: any) => brand.id === brandID);
        return <span>{brand ? brand.brandName : "-"}</span>;
      },
    },
    {
      title: "Chất Liệu",
      dataIndex: "materialID",
      key: "materialID",
      render: (materialID: number) => {
        const material = lstMaterials.find(
          (material: any) => material.id === materialID
        );
        return <span>{material ? material.materialNam : "-"}</span>;
      },
    },
    {
      title: "Kiểu Dáng",
      dataIndex: "styleID",
      key: "styleID",
      render: (styleID: number) => {
        const style = lstStyles.find((style: any) => style.id === styleID);
        return <span>{style ? style.styleName : "-"}</span>;
      },
    },
    {
      title: "Xuất Xứ",
      dataIndex: "originID",
      key: "originID",
      render: (originID: number) => {
        const origin = lstOrigins.find((origin: any) => origin.id === originID);
        return <span>{origin ? origin.originName : "-"}</span>;
      },
    },
    {
      render: (_: any, record: any) => (
        <div className="flex space-x-4">
          <Button
            size="large"
            type="primary"
            onClick={() => editProductItems(record)}
          >
            SỬA
          </Button>
          <Button
            size="large"
            type="dashed"
            onClick={() => deleteProductItems(record)}
          >
            XÓA
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const getProducts = await ProductService.getProducts();

        if (Array.isArray(getProducts.data) && getProducts.data.length > 0) {
          setLstProducts(getProducts.data);

          console.log(getProducts);
        }
      } catch (error) {
        console.error("Error loading data");
      }
    })();
  }, [shouldRender]);

  useEffect(() => {
    (async () => {
      try {
        const getBrands = await BrandService.getBrands();

        if (Array.isArray(getBrands.data) && getBrands.data.length > 0) {
          setLstBrands(getBrands.data);
        }
      } catch (error) {
        console.error("Error loading data");
      }
    })();
  }, [shouldRender]);

  useEffect(() => {
    (async () => {
      try {
        const getStyels = await StyleService.getStyles();

        if (Array.isArray(getStyels.data) && getStyels.data.length > 0) {
          setLstStyles(getStyels.data);
        }
      } catch (error) {
        console.error("Error loading data");
      }
    })();
  }, [shouldRender]);

  useEffect(() => {
    (async () => {
      try {
        const getMaterials = await MaterialService.getMaterials();

        if (Array.isArray(getMaterials.data) && getMaterials.data.length > 0) {
          setLstMaterials(getMaterials.data);
        }
      } catch (error) {
        console.error("Error loading data");
      }
    })();
  }, [shouldRender]);

  useEffect(() => {
    (async () => {
      try {
        const getOrigins = await OriginService.getOrigins();

        if (Array.isArray(getOrigins.data) && getOrigins.data.length > 0) {
          setLstOrigins(getOrigins.data);
        }
      } catch (error) {
        console.error("Error loading data");
      }
    })();
  }, [shouldRender]);

  const deleteProductItems = async (record: any) => {
    try {
      const res: any = await ProductService.deleteProduct(record.productsID);

      if (res.code === 0) setShouldRender((x) => !x);
      message.success("Xóa dòng sản phẩm thành công!");
    } catch (error) {
      console.error("Xóa dòng sản phẩm lỗi! ");
    }
  };

  const editProductItems = async (record: any) => {
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
      const res = await ProductService.createProduct(values);
      if (res.code === 0) setOpenCreateModal(false);
      setShouldRender((x) => !x);
      message.success("Thêm dòng sản phẩm mới thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm dòng sản phẩm mới.");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    try {
      console.log("Updating product line:", values);
      const res = await ProductService.updateProduct(
        openEditModal?.data?.productsID,
        values
      );
      console.log("onEditFinish result:", res);
      if (res.status === 1) {
        setOpenEditModal(undefined);
        setShouldRender((x) => !x);
        message.success("Cập nhật dòng sản phẩm thành công!");
      }
    } catch (error) {
      console.error("Update product line error", error);
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
          dataSource={lstProducts}
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
            label="Tên sản phẩm"
            name="productsName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá nhập"
            name="productImportPrice"
            rules={[
              { required: true, message: "Giá nhập không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá bán"
            name="productPrice"
            rules={[
              { required: true, message: "Giá bán không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Switch checkedChildren="Còn hàng" unCheckedChildren="Hết hàng" />
          </Form.Item>

          <Form.Item label="Hiển thị" name="display" valuePropName="checked">
            <Switch
              checkedChildren="Hiển thị"
              unCheckedChildren="Không hiển thị"
            />
          </Form.Item>
          <Form.Item
            label="Thương hiệu"
            name="brandID"
            rules={[
              { required: true, message: "Brand ID không được để trống!" },
            ]}
          >
            <Select>
              {lstBrands.map((brand: any) => (
                <Select.Option key={brand.brandID} value={brand.brandID}>
                  {brand.brandName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Kiểu dáng"
            name="styleID"
            rules={[
              { required: true, message: "Kiểu dáng không được để trống!" },
            ]}
          >
            <Select>
              {lstStyles.map((style: any) => (
                <Select.Option key={style.styleID} value={style.styleID}>
                  {style.styleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chất liệu"
            name="materialID"
            rules={[
              { required: true, message: "Chất liệu không được để trống!" },
            ]}
          >
            <Select>
              {lstMaterials.map((material: any) => (
                <Select.Option
                  key={material.materialID}
                  value={material.materialID}
                >
                  {material.materialName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Xuất xứ"
            name="originID"
            rules={[
              { required: true, message: "Kiểu dáng không được để trống!" },
            ]}
          >
            <Select>
              {lstOrigins.map((origin: any) => (
                <Select.Option key={origin.originID} value={origin.originID}>
                  {origin.originName}
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
            label="Tên sản phẩm"
            name="productsName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá nhập"
            name="productImportPrice"
            rules={[
              { required: true, message: "Giá nhập không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá bán"
            name="productPrice"
            rules={[
              { required: true, message: "Giá bán không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Switch checkedChildren="Còn hàng" unCheckedChildren="Hết hàng" />
          </Form.Item>

          <Form.Item label="Hiển thị" name="display" valuePropName="checked">
            <Switch
              checkedChildren="Hiển thị"
              unCheckedChildren="Không hiển thị"
            />
          </Form.Item>
          <Form.Item
            label="Thương hiệu"
            name="brandID"
            rules={[
              { required: true, message: "Brand ID không được để trống!" },
            ]}
          >
            <Select>
              {lstBrands.map((brand: any) => (
                <Select.Option key={brand.brandID} value={brand.brandID}>
                  {brand.brandName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Kiểu dáng"
            name="styleID"
            rules={[
              { required: true, message: "Kiểu dáng không được để trống!" },
            ]}
          >
            <Select>
              {lstStyles.map((style: any) => (
                <Select.Option key={style.styleID} value={style.styleID}>
                  {style.styleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Chất liệu"
            name="materialID"
            rules={[
              { required: true, message: "Kiểu dáng không được để trống!" },
            ]}
          >
            <Select>
              {lstMaterials.map((material: any) => (
                <Select.Option
                  key={material.materialID}
                  value={material.materialID}
                >
                  {material.materialName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Xuất xứ"
            name="originID"
            rules={[
              { required: true, message: "Xuất xứ không được để trống!" },
            ]}
          >
            <Select>
              {lstOrigins.map((origin: any) => (
                <Select.Option key={origin.originID} value={origin.originID}>
                  {origin.originName}
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
