const express = require("express");
const controller = require("./controller");
const { authorize, LOGGED_USER } = require("../../middlewares/auth");
const { validate } = require("express-validation");
const joi = require("./validation");

const router = express.Router();

router.param("columnId", controller.load);

router
    .route("/")
    .post(authorize(LOGGED_USER), validate(joi.createValidation), controller.create);

router
    .route("/:columnId")
    .get(authorize(LOGGED_USER), validate(joi.getValidation), controller.get)
    .put(
        authorize(LOGGED_USER),
        validate(joi.updateValidation),
        controller.update
    )
    .delete(
        authorize(LOGGED_USER),
        validate(joi.deleteValidation),
        controller.remove
    );

module.exports = router;
