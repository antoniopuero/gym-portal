let router = require("express").Router();
import models from "../models";
import errors from "../utils/server-errors";
import _ from "lodash";

router.post("/login", async (req, res, next) => {
  const user = await models.user.findOne({email: req.body.email}).exec();
  if (!user) {
    return next(new errors.BadRequest("This account wasn't registered yet"));
  } else if (!user.isPasswordValid(req.body.password)) {
    return next(new errors.BadRequest("The password is incorrect"));
  } else {
    req.session.regenerate(function () {
      req.session.user = user;
      res.json(user);
    });
  }
});

router.post("/signup", async (req, res, next) => {
  const user = _.pick(req.body, ["firstName", "lastName", "email", "password"]);
  if (_.some(user, _.isUndefined) || _.size(user) < 4) {
    return next(new errors.BadRequest("All fields are required to proceed"));
  } else {
    const existedUser = await models.user.findOne({email: req.body.email}).exec();
    if (existedUser) {
      return next(new errors.BadRequest("User with such email already exists."));
    } else {
      models.user.createNewUser(user);
      req.session.regenerate(function () {
        req.session.user = user;
        res.json(user);
      });
    }
  }
});

export default router;
