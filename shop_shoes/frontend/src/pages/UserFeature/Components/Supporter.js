import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AxiosClient from "../../../networks/AxiosClient";
import {
  selectLstOnlineUsers,
  selectUserInfo,
} from "../../../redux/slices/usersSlice";
import { socket } from "../../../App";

export default function Supporter() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);
  const [conversation, setConversation] = useState();
  const [contentsInput, setContentsInput] = useState("");
  

  useEffect(() => {
    (async () => {
      const lstConversations = await AxiosClient.post(
        "/conversations/lst-conversations"
      );
      setConversation(lstConversations.data?.[0]);
    })();
  }, []);

  const userReceive = useMemo(() => {
    return selLstOnlineUsers?.find((onliner) => onliner?.roles === "ADMIN");
  }, [selLstOnlineUsers]);


  const isSupporterOnline = useMemo(
    () => userReceive?.online,
    [userReceive]
  );

  const sendMessages = async () => {
   const resultMessage = await AxiosClient.post("/conversations/add-message", {
      contents: contentsInput
    });
    socket.emit("newConversations", {
      receiverId: userReceive?.userId
    });
    socket.emit("newMessages", {
      messages: resultMessage?.data,
      receiverId: userReceive?.userId,
    })
    setContentsInput("")
  };

  return (
    <div className="flex flex-col h-[80vh] border border-[#000000] rounded-lg">
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
      <div className="flex-1 relative overflow-y-auto"></div>
      <div className="sticky right-0 w-full flex gap-4 bottom-0 px-3 py-4 border-t">
        <input
        value={contentsInput}
        onChange={e => setContentsInput(e.target.value)}
          className="flex-1 px-3 py-2 outline-none"
          placeholder="Nhập tại đây"
        />
        <button onClick={sendMessages}>Gửi</button>
      </div>
    </div>
  );
}
