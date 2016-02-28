let router = require("express").Router();
import models from "../models";
import errors from "../utils/server-errors";
import _ from "lodash";

function selectFields(user) {
  return _.pick(user, ['firstName', 'lastName', 'admin', 'email']);
}

router.post("/login", async (req, res, next) => {
  const user = await models.user.findOne({email: req.body.email}).exec();
  if (!user) {
    return next(new errors.BadRequest("This account wasn't registered yet"));
  } else if (!user.isPasswordValid(req.body.password)) {
    return next(new errors.BadRequest("The password is incorrect"));
  } else {
    req.session.regenerate(function () {
      req.session.user = user;
      res.json(selectFields(user));
    });
  }
});

router.post("/logout", async (req, res, next) => {
  if (req.session.user) {
    req.session.destroy();
    res.sendStatus(200);
  } else {
    return next(new errors.NotFound("The session wasn't created yet"));
  }
});

router.post("/session", async (req, res, next) => {
  if (req.session.user && req.body.email === req.session.user.email) {
    res.json(req.session.user);
  } else {
    return next(new errors.NotFound("The session is over, or wasn't created at all"));
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
      const newUser = await models.user.createNewUser(_.pick(req.body, ["firstName", "lastName", "email", "password", "apiToken", "calendar", "admin", "avatar"]));
      req.session.regenerate(function () {
        req.session.user = newUser;
        res.json(selectFields(newUser));
      });
    }
  }
});

export default router;
