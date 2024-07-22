import {
  DeleteOutlined,
  EditOutlined,
  FileAddTwoTone,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Upload,
  UploadProps,
} from "antd";
import { UploadFile } from "antd/lib";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { URL_IMAGE } from "../constants/constants";
import { AxiosConfig } from "../networks/AxiosRequest";
import BrandService from "../services/BrandApi";
import MaterialService from "../services/MaterialApi";
import OriginService from "../services/OriginApi";
import ProductService from "../services/ProductApi";
import ProductDetailsService from "../services/ProductDetailApi";
import SizesService from "../services/SizeApi";
import StyleService from "../services/StyleApi";

const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ProductPage: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
  const productDetails = useRef<any>();

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
    console.log("values", values);
    console.log("fileList", fileList);
    console.log("productDetails", productDetails.current);

    return;
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
      render: (_: any, record: any) => (
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

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log("newFileList", newFileList);
    setFileList(newFileList);
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const form = new FormData();
          loader.file.then((file) => {
            form.append("image", file);
            Axios.create({
              baseURL: "http://localhost:5500/api/v1",
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              },
            })
              .post("/uploads/multiple", form)
              .then((res) => {
                const imageUrl = res.data?.data?.[0];
                resolve({
                  default: URL_IMAGE(imageUrl),
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

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

      <Drawer
        footer={null}
        placement="right"
        width={"85%"}
        destroyOnClose={true}
        open={openModal.open}
        title={
          <h3 className="text-center font-bold mb-2 text-2xl text-orange-600">
            {openModal.mode === "create" ? "THÊM MỚI" : "CẬP NHẬT"} SẢN PHẨM
          </h3>
        }
        onClose={() => setOpenModal({ open: false, mode: openModal.mode })}
      >
        <Form
          className="grid grid-cols-2 gap-4"
          layout="vertical"
          initialValues={openModal.data}
          onFinish={onFinish}
        >
          {/* Product Form */}
          <Form.Item
            name="productsName"
            label="Tên sản phẩm"
            rules={[
              { required: true, message: "Tên sản phẩm không được để trống" },
            ]}
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="productImportPrice"
            label="Giá nhập"
            rules={[
              { required: true, message: "Giá nhập không được để trống" },
            ]}
          >
            <InputNumber
              placeholder="Nhập tại đây"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="productPrice"
            label="Giá bán"
            rules={[{ required: true, message: "Giá bán không được để trống" }]}
          >
            <InputNumber
              placeholder="Nhập tại đây"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="brandID"
            label="Thương hiệu"
            rules={[
              { required: true, message: "Thương hiệu không được để trống." },
            ]}
          >
            <Select placeholder="Chọn tại đây">
              {brands.map((brand) => (
                <Option key={brand.brandID} value={brand.brandID}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="styleID"
            label="Kiểu dáng"
            rules={[
              { required: true, message: "Kiểu dáng không được để trống" },
            ]}
          >
            <Select placeholder="Chọn tại đây">
              {styles.map((style) => (
                <Option key={style.styleID} value={style.styleID}>
                  {style.styleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="materialID"
            label="Chất liệu"
            rules={[
              {
                required: true,
                message: "Chất liệu không được để trống không được để trống",
              },
            ]}
          >
            <Select placeholder="Chọn tại đây">
              {materials.map((material) => (
                <Option key={material.materialID} value={material.materialID}>
                  {material.materialName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="originID" label="Xuất xứ">
            <Select placeholder="Chọn tại đây">
              {origins.map((origin) => (
                <Option key={origin.originID} value={origin.originID}>
                  {origin.originName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="col-span-2">
            <h1 className="mb-2">Ảnh mô tả sản phẩm:</h1>
            <Upload
              action="http://localhost:5500/api/v1/uploads/multiple"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
          <div className="col-span-2">
            <Divider />
            <h1 className="mb-2">Size sản phẩm:</h1>
            <Form.List name="productDetails">
              {(fields, { add, remove }) => (
                <>
                  <div className="grid grid-cols-2 gap-5">
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align="center">
                        <Form.Item
                          {...restField}
                          name={[name, "sizeID"]}
                          label="Kích thước"
                          rules={[
                            { required: true, message: "Chọn kích thước!" },
                          ]}
                        >
                          <Select
                            style={{ width: 140 }}
                            placeholder="Chọn kích thước"
                          >
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
                          rules={[
                            { required: true, message: "Nhập số lượng!" },
                          ]}
                        >
                          <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Button
                          type="link"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                  </div>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Thêm Size
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div className="col-span-2">
            <Divider />
            <h1 className="mb-2">Mô tả sản phẩm:</h1>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
                mediaEmbed: {
                  previewsInData: true,
                },
              }}
              editor={ClassicEditor}
              data={productDetails.current}
              onChange={(event, editor) => {
                const data = editor.getData();
                productDetails.current = data;
              }}
            />
          </div>
          <div className="flex justify-center col-span-2">
            <Form.Item>
              <Button
                type="primary"
                shape="round"
                icon={<FileAddTwoTone />}
                htmlType="submit"
              >
                {openModal.mode === "create" ? "Thêm mới" : "Cập nhật"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ProductPage;
