import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Name"],
  },
  phone: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

export const Customer = mongoose.model("Customer", customerSchema);
