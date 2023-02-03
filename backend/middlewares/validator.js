const { check, validationResult } = require("express-validator");

module.exports.userRegisterRules = () => [
  check("email", "this field should be a valid email").isEmail(),
  check("password", "password should have at least 6 caracters").isLength({
    min: 6,
  }),
  check("firstName", "firstName is required").notEmpty(),
  check("lastName", "name is required").notEmpty(),
];
module.exports.workerRegisterRules = () => [
  check("email", "this field should be a valid email").isEmail(),
  check("password", "password should have at least 6 caracters").isLength({
    min: 6,
  }),
  check("firstName", "firstName is required").notEmpty(),
  check("lastName", "name is required").notEmpty(),
  check("phoneNumber", "phone number is required").notEmpty(),
  check("profession", "profession is required").notEmpty(),
  check("localisation", "localisation is required").notEmpty(),
];
module.exports.logInRules = () => [
  check("email", "this field should be a valid email").isEmail(),
  check("password", "password should have at least 6 caracters").isLength({
    min: 6,
  }),
];
module.exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  } else {
    next();
  }
};
