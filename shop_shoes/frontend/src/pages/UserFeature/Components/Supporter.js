import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AxiosClient from "../../../networks/AxiosClient";
import {
  selectLstOnlineUsers,
  selectUserInfo,
} from "../../../redux/slices/usersSlice";

export default function Supporter() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);

  const [conversation, setConversation] = useState();
  console.log(selLstOnlineUsers);
  useEffect(() => {
    (async () => {
      const lstConversations = await AxiosClient.post(
        "/conversations/lst-conversations"
      );
      setConversation(lstConversations.data?.[0]);
    })();
  }, []);

  const isSupporterOnline = useMemo(() => {
    return selLstOnlineUsers?.find((onliner) => onliner?.roles === "ADMIN")
      ?.online;
  }, [selLstOnlineUsers, selUserInfo]);

  return (
    <div className="flex flex-col min-h-[80vh] border border-[#000000] rounded-lg">
      <div>
        <div className="h-[60px] flex justify-between border-b border-[#000000] items-center px-5">
          <h1>Hỗ trợ khách hàng</h1>
          <div className="flex items-center space-x-3">
            {isSupporterOnline ? (
              <>
                <div className="w-3 h-3 rounded-full bg-[#008000]"></div>
                <h1>Đang hoạt động</h1>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-[#928f8f]"></div>
                <h1>Đang offline</h1>
              </>
            )}
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
  );
}
