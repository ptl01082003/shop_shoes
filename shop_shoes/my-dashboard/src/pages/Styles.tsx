/**@jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import StyleService from "../services/StyleApi";
import { FormProps } from "antd/lib";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Response } from "../constants/constants";

type StyleType = {
  styleID?: number;
  styleName?: string;
};

const StylesPage: React.FC = () => {
  const [lstStyles, setLstStyles] = useState<StyleType[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<
    Partial<{
      open: boolean;
      data: StyleType;
      type: "create" | "update";
    }>
  >({
    open: false,
  });

  useEffect(() => {
    (async () => {
      const lstStyles = await StyleService.getStyles();
      setLstStyles(lstStyles?.data || []);
    })();
  }, [shouldRender]);

  const deleteStyleItems = async (record: StyleType) => {
    const response = await StyleService.deleteStyle(record.styleID!);
    if (response.code === 0) {
      setShouldRender((prev) => !prev);
    } else {
      toast.error(response.message);
    }
  };

  const onFinish: FormProps<StyleType>["onFinish"] = async (values) => {
    try {
      const response = await StyleService.createStyle(values);
      if (response.code === 0) {
        setOpenCreateModal();
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to create style:", error);
    }
  };

  const onFinish: FormProps<StyleType>["onFinish"] = async (values) => {
    try {
      let response: Response<any>;
      if(modalInfo.type == "create") {

      }else {
        response = await StyleService.updateStyle(
          openEditModal.data.styleID!,
          values
        );
      }
      
      if (response.code === 0) {
        setOpenEditModal({ open: false, data: {} });
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to update style:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "styleID",
      key: "styleID",
    },
    {
      title: "Kiểu dáng",
      dataIndex: "styleName",
      key: "styleName",
    },
    {
      title: "Hành động",
      render: (_: any, record: StyleType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              setModalInfo({
                open: true,
                data: record,
                type: "update",
              })
            }
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteStyleItems(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          size="large"
          type="primary"
          onClick={() =>
            setModalInfo({
              open: true,
              type: "create",
            })
          }
        >
          THÊM MỚI
        </Button>
      </div>
      <div css={tableCustomizeStyle} className="table-responsive">
        <Table
          columns={columns}
          dataSource={lstStyles}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title=""
        centered
        width={768}
        footer={null}
        open={modalInfo.open}
        destroyOnClose={true}
        onCancel={() => setModalInfo({})}
      >
        <Form
          autoComplete="off"
          onFinish={onFinish}
          name="createStyleForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={modalInfo.data}
        >
          <Form.Item
            label="Kiểu dáng"
            name="styleName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {modalInfo.type == "create" ? " Thêm mới" : "Lưu thay đổi"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StylesPage;
