import mongoose from "mongoose";
import errors from "./server-errors";
let isValid = mongoose.Types.ObjectId.isValid;

export default (keys = []) => {
  return (req, res, next) => {
    let error;

    keys.forEach((idKey) => {
      if (!isValid(req.params[idKey])) {
        error = new errors.BadRequest(`invalid ObjectId`);
        return next(error);
      }
    });
    
    if (!error) {
      next();
    }
  };
};