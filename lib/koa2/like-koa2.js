const http = require('http')

class LikeKoa2 {
  constructor() {
    this.middlewareList = []
  }
  use(fn) {
    this.middlewareList.push(fn)
  }
  compose(middlewareList) {
    return function(ctx) {
      function dispatch(i) {
        const fn = middlewareList[i]
        try {
          return Promise.resolve(
            fn(ctx, dispatch.bind(null, i + 1))
          )
        } catch (err) {
          return Promise.reject(err)
        }
      }
      return dispatch(0)
    }
  }
  handleRequest(ctx, fn) {
    return fn(ctx)
  }
  callback() {
    const fn = this.compose(this.middlewareList)
    return (req, res) => {
      const ctx = {
        req,
        res
      }
      return this.handleRequest(ctx, fn)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2