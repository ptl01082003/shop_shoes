// // src/pages/ProductPage.tsx

// import {
//   Button,
//   Form,
//   FormProps,
//   Input,
//   Modal,
//   Table,
//   message,
//   Select,
//   Switch,
// } from "antd";
// import React, { useEffect, useState } from "react";
// import ProductService from "../services/ProductApi";
// import BrandService from "../services/BrandApi";
// import StyleService from "../services/StyleApi";
// import MaterialService from "../services/MaterialApi";
// import OriginService from "../services/OriginApi";
// type FieldType = {
//   productName?: string;
//   productImportPrice?: number;
//   productPrice?: string;
//   status?: boolean;
//   display?: boolean;
//   brandID?: number;
//   styleID?: number;
//   materialID?: number;
//   originID?: number;
// };

// export default function ProductPage() {
//   const [lstProducts, setLstProducts] = useState<any>([]);
//   const [lstBrands, setLstBrands] = useState<any>([]);
//   const [lstStyles, setLstStyles] = useState<any>([]);
//   const [lstOrigins, setLstOrigins] = useState<any>([]);
//   const [lstMaterials, setLstMaterials] = useState<any>([]);
//   const [shouldRender, setShouldRender] = useState<boolean>(false);
//   const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
//   const [openEditModal, setOpenEditModal] = useState<any>({
//     open: false,
//     data: {},
//   });
//   console.log(lstBrands);
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "productsID",
//       key: "productsID",
//     },
//     {
//       title: "Mã sản phẩm",
//       dataIndex: "productCode",
//       key: "productCode",
//     },
//     {
//       title: "Tên sản phẩm",
//       dataIndex: "productsName",
//       key: "productsName",
//     },
//     {
//       title: "Giá Nhập",
//       dataIndex: "productImportPrice",
//       key: "productImportPrice",
//     },
//     {
//       title: "Giá bán",
//       dataIndex: "productPrice",
//       key: "productPrice",
//     },
//     {
//       title: "Trạng Thái",
//       dataIndex: "status",
//       key: "productName",
//       render: (status: boolean) => (
//         <span>{status ? "Còn hàng" : "Hết hàng"}</span>
//       ),
//     },
//     {
//       title: "Hiển thị",
//       dataIndex: "display",
//       key: "display",
//       render: (đisplay: boolean) => (
//         <span>{đisplay ? "Hiển thị" : "Không hiển thị"}</span>
//       ),
//     },
//     {
//       title: "Thương hiệu",
//       dataIndex: "brandID",
//       key: "brandID",
//       render: (brandID: number) => {
//         const brand = lstBrands.find((brand: any) => brand.id === brandID);
//         return <span>{brand ? brand.brandName : "-"}</span>;
//       },
//     },
//     {
//       title: "Chất Liệu",
//       dataIndex: "materialID",
//       key: "materialID",
//       render: (materialID: number) => {
//         const material = lstMaterials.find(
//           (material: any) => material.id === materialID
//         );
//         return <span>{material ? material.materialNam : "-"}</span>;
//       },
//     },
//     {
//       title: "Kiểu Dáng",
//       dataIndex: "styleID",
//       key: "styleID",
//       render: (styleID: number) => {
//         const style = lstStyles.find((style: any) => style.id === styleID);
//         return <span>{style ? style.styleName : "-"}</span>;
//       },
//     },
//     {
//       title: "Xuất Xứ",
//       dataIndex: "originID",
//       key: "originID",
//       render: (originID: number) => {
//         const origin = lstOrigins.find((origin: any) => origin.id === originID);
//         return <span>{origin ? origin.originName : "-"}</span>;
//       },
//     },
//     {
//       render: (_: any, record: any) => (
//         <div className="flex space-x-4">
//           <Button
//             size="large"
//             type="primary"
//             onClick={() => editProductItems(record)}
//           >
//             SỬA
//           </Button>
//           <Button
//             size="large"
//             type="dashed"
//             onClick={() => deleteProductItems(record)}
//           >
//             XÓA
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     (async () => {
//       try {
//         const getProducts = await ProductService.getProducts();

//         if (Array.isArray(getProducts.data) && getProducts.data.length > 0) {
//           setLstProducts(getProducts.data);

//           console.log(getProducts);
//         }
//       } catch (error) {
//         console.error("Error loading data");
//       }
//     })();
//   }, [shouldRender]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const getBrands = await BrandService.getBrands();

//         if (Array.isArray(getBrands.data) && getBrands.data.length > 0) {
//           setLstBrands(getBrands.data);
//         }
//       } catch (error) {
//         console.error("Error loading data");
//       }
//     })();
//   }, [shouldRender]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const getStyels = await StyleService.getStyles();

//         if (Array.isArray(getStyels.data) && getStyels.data.length > 0) {
//           setLstStyles(getStyels.data);
//         }
//       } catch (error) {
//         console.error("Error loading data");
//       }
//     })();
//   }, [shouldRender]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const getMaterials = await MaterialService.getMaterials();

//         if (Array.isArray(getMaterials.data) && getMaterials.data.length > 0) {
//           setLstMaterials(getMaterials.data);
//         }
//       } catch (error) {
//         console.error("Error loading data");
//       }
//     })();
//   }, [shouldRender]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const getOrigins = await OriginService.getOrigins();

//         if (Array.isArray(getOrigins.data) && getOrigins.data.length > 0) {
//           setLstOrigins(getOrigins.data);
//         }
//       } catch (error) {
//         console.error("Error loading data");
//       }
//     })();
//   }, [shouldRender]);

//   const deleteProductItems = async (record: any) => {
//     try {
//       const res: any = await ProductService.deleteProduct(record.productsID);

//       if (res.code === 0) setShouldRender((x) => !x);
//       message.success("Xóa dòng sản phẩm thành công!");
//     } catch (error) {
//       console.error("Xóa dòng sản phẩm lỗi! ");
//     }
//   };

//   const editProductItems = async (record: any) => {
//     console.log("Editing product line:", record);
//     setOpenEditModal({
//       open: true,
//       data: record,
//     });
//   };

//   const onFinish: FormProps<FieldType>["onFinish"] = async (
//     values: FieldType
//   ) => {
//     try {
//       const res = await ProductService.createProduct(values);
//       if (res.code === 0) setOpenCreateModal(false);
//       setShouldRender((x) => !x);
//       message.success("Thêm dòng sản phẩm mới thành công!");
//     } catch (error) {
//       message.error("Có lỗi xảy ra khi thêm dòng sản phẩm mới.");
//     }
//   };

//   const onEditFinish: FormProps<FieldType>["onFinish"] = async (
//     values: FieldType
//   ) => {
//     try {
//       console.log("Updating product line:", values);
//       const res = await ProductService.updateProduct(
//         openEditModal?.data?.productsID,
//         values
//       );
//       console.log("onEditFinish result:", res);
//       if (res.status === 1) {
//         setOpenEditModal(undefined);
//         setShouldRender((x) => !x);
//         message.success("Cập nhật dòng sản phẩm thành công!");
//       }
//     } catch (error) {
//       console.error("Cập nhật dòng sản phẩm lỗi", error);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-end">
//         <Button
//           size="large"
//           type="primary"
//           onClick={() => setOpenCreateModal(true)}
//         >
//           THÊM MỚI
//         </Button>
//       </div>
//       <div className="table-responsive">
//         <Table
//           columns={columns}
//           dataSource={lstProducts}
//           pagination={false}
//           className="ant-border-space"
//         />
//       </div>

//       <Modal
//         title=""
//         centered
//         closable
//         open={isOpenCreateModal}
//         destroyOnClose={true}
//         onCancel={() => setOpenCreateModal(false)}
//         footer={false}
//         width={750}
//       >
//         <Form
//           name="basic"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           style={{ maxWidth: 600 }}
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Tên sản phẩm"
//             name="productsName"
//             rules={[{ required: true, message: "Tên không được để trống!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Giá nhập"
//             name="productImportPrice"
//             rules={[
//               { required: true, message: "Giá nhập không được để trống!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Giá bán"
//             name="productPrice"
//             rules={[
//               { required: true, message: "Giá bán không được để trống!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item label="Trạng thái" name="status" valuePropName="checked">
//             <Switch checkedChildren="Còn hàng" unCheckedChildren="Hết hàng" />
//           </Form.Item>

//           <Form.Item label="Hiển thị" name="display" valuePropName="checked">
//             <Switch
//               checkedChildren="Hiển thị"
//               unCheckedChildren="Không hiển thị"
//             />
//           </Form.Item>
//           <Form.Item
//             label="Thương hiệu"
//             name="brandID"
//             rules={[
//               { required: true, message: "Brand ID không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstBrands.map((brand: any) => (
//                 <Select.Option key={brand.brandID} value={brand.brandID}>
//                   {brand.brandName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Kiểu dáng"
//             name="styleID"
//             rules={[
//               { required: true, message: "Kiểu dáng không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstStyles.map((style: any) => (
//                 <Select.Option key={style.styleID} value={style.styleID}>
//                   {style.styleName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Chất liệu"
//             name="materialID"
//             rules={[
//               { required: true, message: "Chất liệu không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstMaterials.map((material: any) => (
//                 <Select.Option
//                   key={material.materialID}
//                   value={material.materialID}
//                 >
//                   {material.materialName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Xuất xứ"
//             name="originID"
//             rules={[
//               { required: true, message: "Kiểu dáng không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstOrigins.map((origin: any) => (
//                 <Select.Option key={origin.originID} value={origin.originID}>
//                   {origin.originName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit">
//               Thêm mới
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title=""
//         centered
//         closable
//         open={openEditModal?.open}
//         destroyOnClose={true}
//         onCancel={() => setOpenEditModal(undefined)}
//         footer={false}
//         width={750}
//       >
//         <Form
//           name="basic"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           style={{ maxWidth: 600 }}
//           initialValues={openEditModal?.data}
//           onFinish={onEditFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Tên sản phẩm"
//             name="productsName"
//             rules={[{ required: true, message: "Tên không được để trống!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Giá nhập"
//             name="productImportPrice"
//             rules={[
//               { required: true, message: "Giá nhập không được để trống!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Giá bán"
//             name="productPrice"
//             rules={[
//               { required: true, message: "Giá bán không được để trống!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item label="Trạng thái" name="status" valuePropName="checked">
//             <Switch checkedChildren="Còn hàng" unCheckedChildren="Hết hàng" />
//           </Form.Item>

//           <Form.Item label="Hiển thị" name="display" valuePropName="checked">
//             <Switch
//               checkedChildren="Hiển thị"
//               unCheckedChildren="Không hiển thị"
//             />
//           </Form.Item>
//           <Form.Item
//             label="Thương hiệu"
//             name="brandID"
//             rules={[
//               { required: true, message: "Brand ID không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstBrands.map((brand: any) => (
//                 <Select.Option key={brand.brandID} value={brand.brandID}>
//                   {brand.brandName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Kiểu dáng"
//             name="styleID"
//             rules={[
//               { required: true, message: "Kiểu dáng không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstStyles.map((style: any) => (
//                 <Select.Option key={style.styleID} value={style.styleID}>
//                   {style.styleName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Chất liệu"
//             name="materialID"
//             rules={[
//               { required: true, message: "Kiểu dáng không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstMaterials.map((material: any) => (
//                 <Select.Option
//                   key={material.materialID}
//                   value={material.materialID}
//                 >
//                   {material.materialName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Xuất xứ"
//             name="originID"
//             rules={[
//               { required: true, message: "Xuất xứ không được để trống!" },
//             ]}
//           >
//             <Select>
//               {lstOrigins.map((origin: any) => (
//                 <Select.Option key={origin.originID} value={origin.originID}>
//                   {origin.originName}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit">
//               Cập nhật
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductApi, { Product } from "../services/ProductApi";
import ProductDetailsApi, { ProductDetail } from "../services/ProductDetailApi";

const { Option } = Select;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [productDetailModalVisible, setProductDetailModalVisible] =
    useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(
    null
  );
  const [currentProductDetail, setCurrentProductDetail] =
    useState<Partial<ProductDetail> | null>(null);

  const [productForm] = Form.useForm();
  const [productDetailForm] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    fetchProductDetails();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductApi.getProducts();
      setProducts(data);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await ProductDetailsApi.getAllProductDetails();
      setProductDetails(data);
    } catch (error) {
      message.error("Lỗi khi lấy chi tiết sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // CRUD cho sản phẩm
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setProductModalVisible(true);
  };

  const handleEditProduct = (record: Product) => {
    setCurrentProduct(record);
    setProductModalVisible(true);
    productForm.setFieldsValue(record);
  };

  const handleDeleteProduct = async (productId: number) => {
    setLoading(true);
    try {
      await ProductApi.deleteProduct(productId);
      message.success("Xóa sản phẩm thành công");
      fetchProducts();
      fetchProductDetails();
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleProductModalOk = async () => {
    try {
      const values = await productForm.validateFields();
      if (currentProduct) {
        await ProductApi.updateProduct(currentProduct.productID!, values);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await ProductApi.createProduct(values);
        message.success("Tạo mới sản phẩm thành công");
      }
      setProductModalVisible(false);
      fetchProducts();
    } catch (error) {
      message.error("Lỗi khi lưu sản phẩm");
    }
  };

  const handleProductModalCancel = () => {
    setProductModalVisible(false);
    productForm.resetFields();
  };

  // CRUD cho chi tiết sản phẩm
  const handleAddProductDetail = () => {
    setCurrentProductDetail(null);
    setProductDetailModalVisible(true);
  };

  const handleEditProductDetail = (record: ProductDetail) => {
    setCurrentProductDetail(record);
    setProductDetailModalVisible(true);
    productDetailForm.setFieldsValue(record);
  };

  const handleDeleteProductDetail = async (productDetailId: number) => {
    setLoading(true);
    try {
      await ProductDetailsApi.deleteProductDetail(productDetailId);
      message.success("Xóa chi tiết sản phẩm thành công");
      fetchProductDetails();
    } catch (error) {
      message.error("Lỗi khi xóa chi tiết sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleProductDetailModalOk = async () => {
    try {
      const values = await productDetailForm.validateFields();
      if (currentProductDetail) {
        await ProductDetailsApi.updateProductDetail(
          currentProductDetail.productDetailid!,
          values
        );
        message.success("Cập nhật chi tiết sản phẩm thành công");
      } else {
        await ProductDetailsApi.createProductDetail(values);
        message.success("Tạo mới chi tiết sản phẩm thành công");
      }
      setProductDetailModalVisible(false);
      fetchProductDetails();
    } catch (error) {
      message.error("Lỗi khi lưu chi tiết sản phẩm");
    }
  };

  const handleProductDetailModalCancel = () => {
    setProductDetailModalVisible(false);
    productDetailForm.resetFields();
  };

  const productColumns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Mô Tả",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (text: string, record: Product) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.productID!)}
          />
        </span>
      ),
    },
  ];

  const productDetailColumns = [
    {
      title: "Tên Chi Tiết Sản Phẩm",
      dataIndex: "productDetailname",
      key: "productDetailname",
    },
    {
      title: "Mô Tả",
      dataIndex: "productDetaildescription",
      key: "productDetaildescription",
    },
    {
      title: "Sản Phẩm",
      dataIndex: "productId",
      key: "productId",
      render: (productId: number) =>
        products.find((product) => product.productID === productId)
          ?.productName || "Unknown",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (text: string, record: ProductDetail) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProductDetail(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProductDetail(record.productDetailid!)}
          />
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddProduct}>
        <PlusOutlined /> Thêm Sản Phẩm
      </Button>
      <Table
        dataSource={products}
        columns={productColumns}
        rowKey="productID"
        loading={loading}
      />

      <Button type="primary" onClick={handleAddProductDetail}>
        <PlusOutlined /> Thêm Chi Tiết Sản Phẩm
      </Button>
      <Table
        dataSource={productDetails}
        columns={productDetailColumns}
        rowKey="productDetailid"
        loading={loading}
      />

      <Modal
        visible={productModalVisible}
        title={currentProduct ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
        onOk={handleProductModalOk}
        onCancel={handleProductModalCancel}
      >
        <Form form={productForm} layout="vertical">
          <Form.Item
            name="productName"
            label="Tên Sản Phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productDescription"
            label="Mô Tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={productDetailModalVisible}
        title={
          currentProductDetail
            ? "Chỉnh Sửa Chi Tiết Sản Phẩm"
            : "Thêm Chi Tiết Sản Phẩm"
        }
        onOk={handleProductDetailModalOk}
        onCancel={handleProductDetailModalCancel}
      >
        <Form form={productDetailForm} layout="vertical">
          <Form.Item
            name="productDetailname"
            label="Tên Chi Tiết Sản Phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên chi tiết sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productDetaildescription"
            label="Mô Tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả chi tiết sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productId"
            label="Sản Phẩm"
            rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
          >
            <Select placeholder="Chọn sản phẩm">
              {products.map((product) => (
                <Option key={product.productID} value={product.productID}>
                  {product.productName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item
                    key={field.key}
                    label={field.name === 0 ? "Kích Thước và Số Lượng" : ""}
                    required={false}
                  >
                    <Input.Group compact>
                      <Form.Item
                        {...field}
                        name={[field.name, "sizeId"]}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn kích thước",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Kích Thước"
                          style={{ width: "60%" }}
                        >
                          {/* Render các kích thước từ dữ liệu */}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "quantity"]}
                        noStyle
                        rules={[
                          { required: true, message: "Vui lòng nhập số lượng" },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Số Lượng"
                          style={{ width: "40%" }}
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(field.name)}>
                        Xóa
                      </Button>
                    </Input.Group>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                  >
                    <PlusOutlined /> Thêm Kích Thước
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
