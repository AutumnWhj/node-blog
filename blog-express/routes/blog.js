const express = require('express');
const router = express.Router();

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel  } = require('../model/resModel')


router.get('/list', (req, res, next) => {
  let author = req.query.author
    const keyword = req.query.keyword
    // if(req.query.isadmin) {
    //   const loginCheckResult = loginCheck(req)
    //   if (loginCheckResult) {
    //     return loginCheckResult
    //   }
    //   author = req.session.username
    // }

    const result = getList(author, keyword)
    return result.then(listData => {
      res.json( new SuccessModel(listData));
    })
  
})

router.get('/detail', (req, res, next) => {
  res.json({
    errno: 0,
    data: 'ok'
  });
})

module.exports = router;