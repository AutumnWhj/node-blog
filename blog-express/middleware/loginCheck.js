import { ErrorModel } from '../model/resModel'

module.exports = (req, res, next) => {
  if (!req.session.username) {
    res.json(
      new ErrorModel('Not logged in')
    )
    return
  }
  next()
}