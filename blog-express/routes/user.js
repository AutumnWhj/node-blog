const express = require('express');
const router = express.Router();

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel  } = require('../model/resModel')


router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
    console.log('data: ', data);
    if(data.username) {
      req.session.username = data.username
      req.session.realname = data.realname

      res.json(new SuccessModel('Login successful'))
      return
    }
    res.json(new ErrorModel('Login failed'))
  })
})


module.exports = router;