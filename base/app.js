const http = require('http')
const queryString = require('querystring')

// GET methods
const server =  http.createServer((req, res) => {
  console.log('method: ', req.method);
  const url = req.url
  console.log('url: ', url);
  req.query = queryString.parse(url.split('?')[1])
  console.log('req.query: ', req.query);
  res.end(JSON.stringify(req.query))
})

server.listen(4000, () => {
  console.log('http server start at 4000 port');
})