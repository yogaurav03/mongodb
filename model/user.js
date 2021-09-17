const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 255,
    trim: true,
  },
  mobileNo: {
    type: String,
  },
  dob: { 
     type: String,
  },
  countryCode:{
   type: String
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },

  profileImage: {
    type: String,
  },
  
  address: {
    country: {
      type: String,
      maxlength: 255,
      trim: true,
    },
    state: {
      type: String,
      maxlength: 255,
      trim: true,
    },
    city: {
      type: String,
      maxlength: 255,
      trim: true,
    },
    pinCode: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      maxlength: 255,
      trim: true,
    },
    houseNo: {
      type: String,
      maxlength: 255,
      trim: true,
    }
  },
  deviceType: {
    type: String,
    trim: true,
  },
  deviceId: {
    type: String,
    trim: true,
  },
  deviceToken: {
    type: String,
    trim: true,
  },
  isDevice: {
   type: Boolean,
   default: true,
  },
  loginType: {
    type: String,
    enum: ["mobile", "system"],
  },
  status: {
    type: Boolean,
    default: true,
  },
},
  {
    timestamps: true
  }
 
);


const User = mongoose.model("User", userSchema);

module.exports = User;
