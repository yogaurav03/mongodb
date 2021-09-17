const winston = require("winston");
const User = require("../model/user");
const keys = require("../config/keys");
const {
  hashPassword,
  verifyPassword,
  signJwt,
} = require("../common/index");

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if(!email) {
      return res
        .status(404)
        .json({ error: "Email is required" });
    }
    let user;
    if(email) {
        user = await User.findOne({email});
    if(!user) return res.status(404).json({ error: "Email not found" });
    }

    const checkPassword = verifyPassword(
      password,
      user.password
    ); 
    if(!checkPassword)
      return res.status(403).json({ error: "Invalid Password" });

    let jwtoken = signJwt(user._id, user.email);
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Logged In",
      data: { token: jwtoken, user },
    });
  } catch (error) {
    winston.error(error);
  }
};

exports.signup = async (req, res) => {
  try {
    // check existing email
    const { email, password } = req.body;
    let check_email = await User.findOne({ email});
    if (check_email)
      return res.status(400).json({ error: "Email is already registered" });
      const hashedPassword = await hashPassword(password);
      let new_user = new User({
          email: email,
          password: hashedPassword,
        
      });

    let token = signJwt(new_user._id, new_user.email);
    const save = await new_user.save();

    return res.status(200).json({
      success: true,
      msg: "User Registered successfully",
      data: { user: save, token },
    });
  } catch (error) {
    winston.error(error);
  }
};

exports.profileSetup = async (req, res) => {
  try {
    const {fullName, mobileNo, dob, countryCode, address } = req.body;
    const is_Exists = await User.findOne({_id: req.tokenData.id});
    if(!is_Exists) return res.status(404).json({error: 'user not found'});
   const profileImage = req.files && req.files.profileImage && keys.apiURL + req.files.profileImage[0].filename || is_Exists.profileImage;
   const modifiedAddress = address && JSON.parse(address)
    const user = await User.updateOne({_id: req.tokenData.id}, {$set: { fullName, profileImage, mobileNo, dob, countryCode, address: modifiedAddress}})
    
    if(!user) return res.status(400).json({error: 'something went wrong'})

    return res.status(200).json({
      success: true,
      msg: "Your Profile hasbeen updated successfully",
      data: { user },
    });
  } catch (error) {
    winston.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.tokenData.id);
    if (!user) return res.status(404).json({ error: "user not found" });

    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    winston.error(error);
  }
};
