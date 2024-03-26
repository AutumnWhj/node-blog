const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  res.end(
    JSON.stringify({
      msg: 'Hello World11',
      env: process.env.NODE_ENV
    })
  )
}
module.exports = serverHandle