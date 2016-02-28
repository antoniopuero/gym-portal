let router = require("express").Router();
import models from "../models";
import errors from "../utils/server-errors";
import _ from "lodash"
import isValidId from "../utils/isIdValid";

function selectFields(user) {
  return _.pick(user, ["firstName", "lastName", "email", "password", "apiToken", "calendar", "admin", "avatar"]);
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return next(new errors.Forbidden("login to the system"));
  }
}

function adminRestrict(req, res, next) {
  if (req.session.user.admin) {
    next();
  } else {
    next(new errors.Forbidden("you don't have admin rights"));
  }
}

router.get("/me*", restrict);
router.get("/admin*", restrict, adminRestrict);

router.get("/me/admins", async (req, res, next) => {
  let admins = await models.user.find({admin: true}).select('email firstName lastName').exec();

  if (!admins || !admins.length) {
    return next(new errors.NotFound("no admins found"));
  } else {
    res.json({admins});
  }
});

router.get("/me/admins/:adminId", isValidId(["adminId"]), async (req, res, next) => {
  const admin = await models.user.findById(req.params.adminId).exec();

  if (!admin) {
    return next(new errors.NotFound("no such admin"));
  } else {
    res.json({admin: selectFields(admin)});
  }
});


export default router;