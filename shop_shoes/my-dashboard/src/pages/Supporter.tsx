import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AxiosClient from "../networks/AxiosRequest";
import { selectLstOnlineUsers, selectUserInfo } from "../app/slice/userSlice";
import { Avatar } from "antd";
import { socket } from "../App";
import TimeAgo from "../components/TimeAgo";

export default function SupporterPage() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    (async () => {
      const lstConversations = await AxiosClient.post(
        "/conversations/lst-conversations"
      );
      setConversation(lstConversations.data || []);
    })();
  }, []);

  console.log(conversation);

  useEffect(() => {
    socket.on("newConversations", async () => {
      const lstConversations = await AxiosClient.post(
        "/conversations/lst-conversations"
      );
      setConversation(lstConversations.data || []);
    });
  }, []);

  const isSupporterOnline = useMemo(() => {
    return selLstOnlineUsers?.find((onliner) => onliner?.roles === "ADMIN")
      ?.online;
  }, [selLstOnlineUsers, selUserInfo]);

  return (
    <div className="flex gap-6">
      <div className="space-y-3 p-4 w-[300px] rounded-lg border border-[#000000]">
        {Array.isArray(conversation) &&
          conversation.length > 0 &&
          conversation.map((users: any) => {
            const senderKeyName = selUserInfo?.userId === users?.receiverId ? "sender" : "receiver";
            return (
              <div className="flex gap-3 cursor-pointer">
                <Avatar
                  className="flex-shrink-0"
                  size={"large"}
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  U
                </Avatar>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="italic">{users?.[senderKeyName]?.fullName}</h3>
                    <div className="w-[10px] h-[10px] rounded-full bg-[#008000]"></div>
                  </div>
                  <h3 className="italic mb-1 line-clamp-1">
                    {users?.lastMessage?.contents}
                  </h3>
                  <h3 className="text-xs">
                    <TimeAgo time={users?.lastMessage?.createdAt} />
                  </h3>
                </div>
              </div>
            )
          })}
      </div>
      <div className="flex flex-1 flex-col h-[80vh] border border-[#000000] rounded-lg">
        <div>
          <div className="h-[60px] flex justify-between border-b border-[#000000] items-center px-6">
            <h1>Phạm Ngọc Tuyên</h1>
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
            className="flex-1 px-3 py-2 outline-none"
            placeholder="Nhập tại đây"
          />
          <button>Gửi</button>
        </div>
      </div>
    </div>
  );
}
