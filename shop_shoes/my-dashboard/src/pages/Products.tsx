import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Switch,
  Modal,
  Table,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ProductService from "../services/ProductApi";
import ProductDetailsService from "../services/ProductDetailApi";
import SizesService from "../services/SizeApi";
import BrandService from "../services/BrandApi";
import StyleService from "../services/StyleApi";
import MaterialService from "../services/MaterialApi";
import OriginService from "../services/OriginApi";

const { Option } = Select;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [origins, setOrigins] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: any;
  }>({ open: false, mode: "create" });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await ProductService.getProducts();
        setProducts(productResponse.data);

        const sizeResponse = await SizesService.getSizes();
        setSizes(sizeResponse.data);

        const brandResponse = await BrandService.getBrands();
        setBrands(brandResponse.data);

        const styleResponse = await StyleService.getStyles();
        setStyles(styleResponse.data);

        const materialResponse = await MaterialService.getMaterials();
        setMaterials(materialResponse.data);

        const originResponse = await OriginService.getOrigins();
        setOrigins(originResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // const onFinish = async (values: any) => {
  //   try {
  //     if (openModal.mode === "create") {
  //       // Create Product
  //       const productResponse = await ProductService.createProduct(values);
  //       if (productResponse) {
  //         message.success("Thêm sản phẩm thành công!");
  //         setOpenModal({ open: false, mode: "create" });
  //         setProducts((prev) => [...prev, productResponse.data]);

  //         // Create Product Details
  //         const productDetailValues = values.productDetails;
  //         if (productDetailValues) {
  //           await ProductDetailsService.createProductDetail(
  //             productDetailValues
  //           );
  //           message.success("Thêm chi tiết sản phẩm thành công!");
  //         }
  //       }
  //     } else {
  //       // Update Product
  //       const productResponse = await ProductService.updateProduct(
  //         openModal.data.productsID,
  //         values
  //       );
  //       if (productResponse) {
  //         message.success("Cập nhật sản phẩm thành công!");
  //         setOpenModal({ open: false, mode: "edit" });
  //         setProducts((prev) =>
  //           prev.map((item) =>
  //             item.productsID === productResponse.data.productsID
  //               ? productResponse.data
  //               : item
  //           )
  //         );

  //         // Update Product Details
  //         const productDetailValues = values.productDetails;
  //         if (productDetailValues) {
  //           await ProductDetailsService.updateProductDetail(
  //             openModal.data.productDetailID,
  //             productDetailValues
  //           );
  //           message.success("Cập nhật chi tiết sản phẩm thành công!");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     message.error("Có lỗi xảy ra khi xử lý dữ liệu.");
  //   }
  // };

  const onFinish = async (values: any) => {
    try {
      if (openModal.mode === "create") {
        // Create Product
        const productResponse = await ProductService.createProduct(values);
        if (productResponse) {
          message.success("Thêm sản phẩm thành công!");
          setOpenModal({ open: false, mode: "create" });
          setProducts((prev) => [...prev, productResponse.data]);

          // Create Product Details
          const productDetailValues = values.productDetails;
          if (productDetailValues) {
            await ProductDetailsService.createProductDetail(
              productDetailValues
            );
            message.success("Thêm chi tiết sản phẩm thành công!");
          }
        }
      } else {
        // Update Product
        const productResponse = await ProductService.updateProduct(
          openModal.data.productsID,
          values
        );
        if (productResponse) {
          message.success("Cập nhật sản phẩm thành công!");
          setOpenModal({ open: false, mode: "edit" });
          setProducts((prev) =>
            prev.map((item) =>
              item.productsID === productResponse.data.productsID
                ? productResponse.data
                : item
            )
          );

          // Update Product Details
          const productDetailValues = values.productDetails;
          if (productDetailValues) {
            await ProductDetailsService.updateProductDetail(
              openModal.data.productDetailID,
              productDetailValues
            );
            message.success("Cập nhật chi tiết sản phẩm thành công!");
          }
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Lỗi: ${error.response.data.message}`);
      } else {
        message.error("Có lỗi xảy ra khi xử lý dữ liệu.");
      }
      console.error("Error in onFinish:", error);
    }
  };

  const handleDeleteProduct = async (productsID: number) => {
    try {
      await ProductService.deleteProduct(productsID);
      setProducts((prev) =>
        prev.filter((item) => item.productsID !== productsID)
      );
      message.success("Xóa sản phẩm thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  const handleEditProduct = (product: any) => {
    setOpenModal({ open: true, mode: "edit", data: product });
    setSelectedProduct(product);
  };

  const columns = [
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
      title: "Giá nhập",
      dataIndex: "productImportPrice",
      key: "productImportPrice",
    },
    {
      title: "Giá bán",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Kích hoạt" : "Ngừng hoạt động"),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.productsID)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        size="large"
        type="primary"
        onClick={() => setOpenModal({ open: true, mode: "create" })}
      >
        THÊM SẢN PHẨM
      </Button>
      <Table columns={columns} dataSource={products} rowKey="productsID" />

      <Modal
        title={openModal.mode === "create" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
        visible={openModal.open}
        onCancel={() => setOpenModal({ open: false, mode: openModal.mode })}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={openModal.data}
          onFinish={onFinish}
        >
          {/* Product Form */}
          <Form.Item
            name="productsName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productImportPrice"
            label="Giá nhập"
            rules={[{ required: true, message: "Vui lòng nhập giá nhập!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="productPrice"
            label="Giá bán"
            rules={[{ required: true, message: "Vui lòng nhập giá bán!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="brandID" label="Thương hiệu">
            <Select placeholder="Chọn thương hiệu">
              {brands.map((brand) => (
                <Option key={brand.brandID} value={brand.brandID}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="styleID" label="Kiểu dáng">
            <Select placeholder="Chọn kiểu dáng">
              {styles.map((style) => (
                <Option key={style.styleID} value={style.styleID}>
                  {style.styleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="materialID" label="Chất liệu">
            <Select placeholder="Chọn chất liệu">
              {materials.map((material) => (
                <Option key={material.materialID} value={material.materialID}>
                  {material.materialName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="originID" label="Nguồn gốc">
            <Select placeholder="Chọn nguồn gốc">
              {origins.map((origin) => (
                <Option key={origin.originID} value={origin.originID}>
                  {origin.originName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Product Details Form */}
          <Form.List name="productDetails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "sizeID"]}
                      label="Kích thước"
                      rules={[{ required: true, message: "Chọn kích thước!" }]}
                    >
                      <Select placeholder="Chọn kích thước">
                        {sizes.map((size) => (
                          <Option key={size.sizeID} value={size.sizeID}>
                            {size.sizeName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      label="Số lượng"
                      rules={[{ required: true, message: "Nhập số lượng!" }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Button
                      typeof="danger"
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm chi tiết sản phẩm
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {openModal.mode === "create" ? "Thêm" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductPage;
