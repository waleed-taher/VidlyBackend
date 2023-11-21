import express from "express";
import Joi from "joi";
import { Customer } from "../db/customerdb.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.status(200).send(customer);
});

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

const validateCustomer = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    phone: Joi.string().min(11).max(12).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(body);
};

export { router as customerRouter };
