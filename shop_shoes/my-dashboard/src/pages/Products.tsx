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
          openModal.data.productId,
          values
        );
        if (productResponse) {
          message.success("Cập nhật sản phẩm thành công!");
          setOpenModal({ open: false, mode: "edit" });
          setProducts((prev) =>
            prev.map((item) =>
              item.productId === productResponse.data.productId
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
    } catch (error) {
      message.error("Có lỗi xảy ra khi xử lý dữ liệu.");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await ProductService.deleteProduct(productId);
      setProducts((prev) =>
        prev.filter((item) => item.productId !== productId)
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
    // {
    //   title: "Thương hiệu",
    //   dataIndex: "brandName",
    //   key: "brandName",
    // },
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
            onClick={() => handleDeleteProduct(record.productId)}
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
      <Table columns={columns} dataSource={products} rowKey="productId" />

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
            name="productName"
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
