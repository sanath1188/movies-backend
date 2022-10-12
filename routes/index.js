/**
 * @fileOverview Main router.
 */

const user = require("./user");
const movie = require("./movie");

const router = require("express").Router();

router.use("/user", user);
router.use("/movie", movie);

module.exports = router;
