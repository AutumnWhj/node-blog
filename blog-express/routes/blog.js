const express = require('express');
const router = express.Router();

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel  } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


router.get('/list', (req, res, next) => {
  let author = req.query.author
    const keyword = req.query.keyword
    if(req.query.isadmin) {
      if (!req.session.username) {
        res.json(
          new ErrorModel('Not logged in')
        )
        return 
      }
      author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
      res.json( new SuccessModel(listData));
    })
  
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(new SuccessModel(data));
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data));
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel('Update blog failed'));
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel('Delete blog failed'));
    }
  }) 
})

module.exports = router;