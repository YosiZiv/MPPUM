const express = require('express');

const router = express.Router();
const {
  registerAdmin,
  registerUser,
  emailConfirm,
} = require('../handlers/register');
//  middleware
const { adminCheckToken } = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

router.post('/registeradmin', asyncMiddleware(registerAdmin));
router.post('/registeruser', adminCheckToken, asyncMiddleware(registerUser));
router.get('/confirmed/:token', asyncMiddleware(emailConfirm));
module.exports = router;
