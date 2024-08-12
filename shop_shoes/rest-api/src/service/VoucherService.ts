import { Vouchers, Vouchers_STATUS, Voucher_RULE } from "../models/Vouchers";
import { UserVouchers } from "../models/UserVouchers";
import { Op } from "sequelize";

// Các hàm kiểm tra quy tắc
function checkMinOrderValue(
  orderValue: number,
  minOrderValue: number
): boolean {
  return orderValue >= minOrderValue;
}

function checkValidProducts(
  orderProducts: number[] = [],
  validProducts: number[] = []
): boolean {
  return orderProducts.every((product) => validProducts.includes(product));
}

function checkUserLevel(
  userLevel: string = "",
  requiredLevel: string = ""
): boolean {
  return userLevel === requiredLevel;
}

function checkOrderCount(
  orderCount: number = 0,
  minOrderCount: number = 0,
  maxOrderCount?: number
): boolean {
  return (
    orderCount >= minOrderCount &&
    (maxOrderCount !== undefined ? orderCount <= maxOrderCount : true)
  );
}

function isVoucherExpired(endDay: string): boolean {
  const endDate = new Date(endDay);
  const currentDate = new Date();
  return currentDate > endDate;
}

// Hàm phân phát voucher với kiểm tra xem voucher đã được phân phát chưa
export async function allocateVoucherToUser(userId: number, orderDetails: any) {
  try {
    const vouchers = await Vouchers.findAll({
      where: {
        status: Vouchers_STATUS.ISACTIVE,
      },
    });

    for (const voucher of vouchers) {
      let isEligible = true;

      // Kiểm tra ngày hết hạn của voucher
      if (isVoucherExpired(voucher.endDay)) {
        isEligible = false;
        console.log(
          `Voucher ${voucher.code} đã hết hạn và không được phân phát.`
        );
      }

      // Kiểm tra điều kiện MIN_ORDER_VALUE
      if (
        voucher.ruleType === Voucher_RULE.MIN_ORDER_VALUE &&
        !checkMinOrderValue(orderDetails.value, voucher.minOrderValue || 0)
      ) {
        isEligible = false;
      }

      // Kiểm tra điều kiện VALID_PRODUCTS
      if (
        voucher.ruleType === Voucher_RULE.VALID_PRODUCTS &&
        !checkValidProducts(
          orderDetails.productIds || [],
          voucher.validProducts || []
        )
      ) {
        isEligible = false;
      }

      // Kiểm tra điều kiện USER_LEVEL
      if (
        voucher.ruleType === Voucher_RULE.USER_LEVEL &&
        !checkUserLevel(orderDetails.userLevel, voucher.userLevel || "")
      ) {
        isEligible = false;
      }

      // Kiểm tra điều kiện ORDER_COUNT
      if (
        voucher.ruleType === Voucher_RULE.ORDER_COUNT &&
        !checkOrderCount(
          orderDetails.orderCount || 0,
          voucher.minOrderCount || 0,
          voucher.maxOrderCount
        )
      ) {
        isEligible = false;
      }

      if (isEligible) {
        // Kiểm tra xem người dùng đã có voucher này chưa
        const existingVoucher = await UserVouchers.findOne({
          where: {
            userId,
            voucherId: voucher.voucherId,
          },
        });

        if (!existingVoucher) {
          // Nếu chưa có thì phân phát voucher cho người dùng
          await UserVouchers.create({
            userId,
            voucherId: voucher.voucherId,
            status: Vouchers_STATUS.UNUSED,
          });
          console.log(
            `Voucher ${voucher.code} đã được phân phát cho người dùng ${userId}`
          );
        } else {
          console.log(
            `Người dùng ${userId} đã nhận voucher ${voucher.code} rồi.`
          );
        }
      }
    }
  } catch (error) {
    console.error("Lỗi trong quá trình phân phát voucher:", error);
  }
}
export async function handleExpiredVouchers() {
  try {
    // Lấy tất cả các voucher còn hiệu lực
    const vouchers = await Vouchers.findAll({
      where: {
        status: Vouchers_STATUS.ISACTIVE,
      },
    });

    // Duyệt qua từng voucher để kiểm tra xem có hết hạn không
    for (const voucher of vouchers) {
      if (isVoucherExpired(voucher.endDay)) {
        // Cập nhật trạng thái voucher thành EXPIRED
        voucher.status = Vouchers_STATUS.EXPIRED;
        await voucher.save();
        console.log(
          `Voucher ${voucher.code} đã hết hạn và trạng thái đã được cập nhật.`
        );
      }
    }
  } catch (error) {
    console.error("Lỗi khi xử lý voucher hết hạn:", error);
  }
}


export async function removeExpiredUserVouchers() {
  try {
    // Lấy danh sách voucher đã hết hạn
    const expiredVouchers = await Vouchers.findAll({
      where: { status: Vouchers_STATUS.EXPIRED },
    });

    // Lấy danh sách voucherId đã hết hạn
    const expiredVoucherIds = expiredVouchers.map(
      (voucher) => voucher.voucherId
    );

    // Xóa các voucher hết hạn khỏi bảng UserVouchers
    await UserVouchers.destroy({
      where: {
        voucherId: expiredVoucherIds,
      },
    });

    console.log("Các voucher hết hạn đã được xóa khỏi bảng UserVouchers.");
  } catch (error) {
    console.error("Lỗi khi xóa voucher hết hạn khỏi bảng UserVouchers:", error);
  }
}


