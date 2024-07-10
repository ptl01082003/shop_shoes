import { Request, Response, NextFunction } from "express";
import { Customers } from "../models/Customers";

const CustomersController = {
  addCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        customerName,
        customerDateOfBirth,
        customerSex,
        customerPhoneNumber,
        customerEmail,
        customerImage,
      } = req.body;

      const newCustomer = await Customers.create({
        customerName,
        customerDateOfBirth,
        customerSex,
        customerPhoneNumber,
        customerEmail,
        customerImage,
      });

      res.json({ data: newCustomer, message: "Customer created successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getCustomers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await Customers.findAll();
      res.json({ data: customers });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getCustomerById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const customer = await Customers.findByPk(id);
      if (customer) {
        res.json({ data: customer });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        customerName,
        customerDateOfBirth,
        customerSex,
        customerPhoneNumber,
        customerEmail,
        customerImage,
      } = req.body;

      const customer = await Customers.findByPk(id);
      if (customer) {
        await customer.update({
          customerName,
          customerDateOfBirth,
          customerSex,
          customerPhoneNumber,
          customerEmail,
          customerImage,
        });

        res.json({ message: "Customer updated successfully" });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const customer = await Customers.findByPk(id);
      if (customer) {
        await customer.destroy();
        res.json({ message: "Customer deleted successfully" });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default CustomersController;
