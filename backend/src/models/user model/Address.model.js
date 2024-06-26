import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  locality: { // house no + floor no
    type: String,
    required: true,
    trim: true,
    maxlength: 50  
  },
  landmark: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50  
  },
  streetAddress: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  district: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50  
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  state: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
}, {
  timestamps: true,
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
