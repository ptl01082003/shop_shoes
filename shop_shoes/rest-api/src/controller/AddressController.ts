import { NextFunction, Request, Response } from "express";
import { Address } from "../models/Address";

const AddressController = {
  addAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        addressCityCode,
        addressWardCode,
        addressDistrictCode,
        addressCityName,
        addressWardName,
        addressDistrictName,
        addressEmail,
        addressPhoneNumber,
        addressRecipientName,
        addressDefault,
        customersID,
      } = req.body;

      const newAddress = await Address.create({
        addressCityCode,
        addressWardCode,
        addressDistrictCode,
        addressCityName,
        addressWardName,
        addressDistrictName,
        addressEmail,
        addressPhoneNumber,
        addressRecipientName,
        addressDefault,
        customersID,
      });

      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: newAddress,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getAddresses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addresses = await Address.findAll();
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: addresses,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getAddressById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const address = await Address.findByPk(id);
      if (address) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: address,
        });
      } else {
        res.status(404).json({
          message: "Địa chỉ không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        addressCityCode,
        addressWardCode,
        addressDistrictCode,
        addressCityName,
        addressWardName,
        addressDistrictName,
        addressEmail,
        addressPhoneNumber,
        addressRecipientName,
        addressDefault,
        customersID,
      } = req.body;

      const address = await Address.findByPk(id);
      if (address) {
        await address.update({
          addressCityCode,
          addressWardCode,
          addressDistrictCode,
          addressCityName,
          addressWardName,
          addressDistrictName,
          addressEmail,
          addressPhoneNumber,
          addressRecipientName,
          addressDefault,
          customersID,
        });

        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: address,
        });
      } else {
        res.status(404).json({
          message: "Địa chỉ không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  deleteAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const address = await Address.findByPk(id);
      if (address) {
        await address.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Địa chỉ không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default AddressController;
