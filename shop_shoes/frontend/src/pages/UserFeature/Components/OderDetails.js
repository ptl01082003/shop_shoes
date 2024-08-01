import React, { useEffect, useState } from "react";
import {Tabs} from "antd";
import { ODER_STATUS_STRING } from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";

export default function OderDetails() {
  const [lstOders, setLstOders] = useState();

  useEffect(() => {
    (async () => {
      const oders = await AxiosClient.post("/payment-orders/lst-orders");
      setLstOders(oders?.data || []);
    })();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };
  
  const items = ODER_STATUS_STRING.map((oders) => (
    {
      key: oders?.value,
      label: oders?.label,
      children: <div>{oders?.label}</div>,
    }
  ));
  
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}
