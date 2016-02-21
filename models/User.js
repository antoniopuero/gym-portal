import mongoose from "mongoose";
import md5 from "md5";
import nconf from "../config";

let Schema = mongoose.Schema;

let userSchema = Schema({
  firstName: String,
  lastName: String,
  admin: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    set: (password) => {
      return md5(password + nconf.get("salt"));
    }
  }
});

userSchema.methods.isPasswordValid = function (password) {
  return this.password === md5(password + nconf.get("salt"));
};

userSchema.statics.createNewUser = async function (userProps) {
  var newUser = new this(userProps);
  await newUser.save();
  return newUser;
};

export default mongoose.model("User", userSchema);