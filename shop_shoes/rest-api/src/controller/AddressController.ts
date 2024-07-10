import { Request, Response, NextFunction } from "express";
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

      res.json({ data: newAddress, message: "Address created successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAddresses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addresses = await Address.findAll();
      res.json({ data: addresses });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAddressById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const address = await Address.findByPk(id);
      if (address) {
        res.json({ data: address });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
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

        res.json({ message: "Address updated successfully" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const address = await Address.findByPk(id);
      if (address) {
        await address.destroy();
        res.json({ message: "Address deleted successfully" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default AddressController;
