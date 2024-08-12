import cron from "node-cron";
import {
  allocateVoucherToUser,
  handleExpiredVouchers,
  removeExpiredUserVouchers,
} from "../service/VoucherService"; // Đảm bảo đường dẫn đúng
import { Users } from "../models/Users";
import { OrderDetails } from "../models/OrderDetails";
import { OrderItems } from "../models/OrderItems";

// Lên lịch cron job để chạy mỗi ngày vào lúc 1:00 AM
cron.schedule("* * * * *", async () => {
  console.log("Con job bắt đầu chạy...");

  try {
    // Xử lý voucher hết hạn
    await handleExpiredVouchers();
    // console.log("Xử lý các voucher hết hạn hoàn thành.");

    await removeExpiredUserVouchers();

    // console.log("Xóa voucher hết hạn hoàn thành.");

    // Lấy tất cả người dùng
    const users = await Users.findAll();

    // Duyệt qua từng người dùng
    for (const user of users) {
      // Lấy tất cả đơn hàng của người dùng từ OrderDetails
      const orders = await OrderDetails.findAll({
        where: { userId: user.userId },
        include: [
          {
            model: OrderItems,
            as: "orderItems",
            attributes: ["productDetailId", "amount"], // Chọn thuộc tính cần thiết từ OrderItems
          },
        ],
      });

      if (orders.length > 0) {
        for (const order of orders) {
          // Lấy thông tin đơn hàng
          const totalValue = order.amount; // Thay đổi nếu cần
          const productIds = order.orderItems.map(
            (item) => item.productDetailId
          ); // Lấy danh sách sản phẩm
          const orderCount = orders.length; // Số lượng đơn hàng
          const userLevel = user.roleId; // Sử dụng roleId thay cho userLevel, nếu phù hợp

          // Kiểm tra thông tin để xác nhận
          // console.log(
          //   `Phân phát voucher cho người dùng ${user.userId} với giá trị ${totalValue}, sản phẩm ${productIds}, cấp độ ${userLevel}, số lượng đơn hàng ${orderCount}`
          // );

          // Phân phát voucher cho người dùng
          await allocateVoucherToUser(user.userId, {
            value: totalValue,
            productIds,
            userLevel: String(userLevel), // Chuyển đổi thành chuỗi nếu cần
            orderCount,
          });
        }
      }
    }
    console.log("Cron job hoàn thành.");
  } catch (error) {
    console.error("Lỗi trong cron job:", error);
  }
});
