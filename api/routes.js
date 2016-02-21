let router = require("express").Router();
import models from "../models";
import errors from "../utils/server-errors";
import _ from "lodash"

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next(new errors.Forbidden("login to the system"));
  }
}

function adminRestrict(req, res, next) {
  if (req.session.user.admin) {
    next();
  } else {
    next(new errors.Forbidden("you don't have admin rights"));
  }
}

router.get("me*", restrict);
router.get("admin*", restrict, adminRestrict);


export default router;