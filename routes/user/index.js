/**
 * @fileOverview Main user router.
 */
const to = require('await-to-js').to;

const { userSvc } = require("../../services");
const router = require("express").Router();
const bcrypt = require('bcrypt-nodejs');
const { generateJWTToken } = require('../../utils');
const { verifyToken } = require('../../middleware');

/** Route that registers a user. */
router.post("/register", async function (req, res) {
  let { firstName, lastName, email, password } = req.body;

  let [userDetailsErr, userDetails] = await to(userSvc.createUser({ first_name: firstName, last_name: lastName, email, password }));

  if (userDetailsErr) {
    return res.status(500).json({
      status: 'error',
      message: userDetailsErr.message
    })
  }

  res.status(200).json({
    status: 'success',
  })
});

/** Route that logs a user in. */
router.post("/login", async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  const findUserByEmail = {
    email
  };

  const [userErr, user] = await to(userSvc.findUser(findUserByEmail, true, 'findOne', ['id', 'password']));

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const [tokenErr, token] = await to(generateJWTToken(user.id));

      if (tokenErr) {
        return res.status(500).json({
          status: 'error',
          message: tokenErr.message
        })
      } else {
        res.status(200).json({
          status: 'success',
          data: { token }
        })
      }
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized access'
      })
    }
  } else {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    })
  }

});

/** Route that fetches user data. */
router.get('/me', verifyToken, async (req, res) => {
  let [userErr, user] = await to(userSvc.findUser({id: req.userId }, true, 'findOne', ['first_name', 'last_name']));

  if (userErr) {
    return res.status(500).json({
      status: 'error',
      message: userErr.message
    })
  } else {
    res.status(200).json({
      status: 'success',
      data: { user }
    })
  }
})

module.exports = router;
