import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRepo = {

  /// LOGIN

  login: async ({ email, password }) => {
    //print('login user in user repository, haha', OutputType.INFORMATION)
    let existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      //not encrypt password !
      let isMatch = await bcrypt.compare(password, existingUser.password);
      if (!!isMatch) {
        //create Java Web Token
        let token = jwt.sign(
          {
            data: existingUser,
          },
          process.env.JWT_SECRET,
          {
            //expiresIn: '60', //1 minute
            expiresIn: "30 days",
          }
        );
        //clone an add more properties
        return {
          ...existingUser.toObject(),
          password: "not show",
          token: token,
        };
      } else {
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  },

  /// REGISTER 

  register: async ({ name, email, password, phoneNumber, address }) => {
    //validation already done
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
  
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    //insert to db
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return {
      ...newUser._doc,
      password: "Not show",
    };
  },

  findUserById: async (id) => {
  return User.findById(id);
},

/// UPDATE BY ID

updateById: async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
},

/// DELETE BY ID

deleteById: async (id) => {
  return User.findByIdAndDelete(id);
}
};
