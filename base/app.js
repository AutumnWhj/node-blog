const http = require('http')


// GET method
// const queryString = require('querystring')
// const server =  http.createServer((req, res) => {
//   console.log('method: ', req.method);
//   const url = req.url
//   console.log('url: ', url);
//   req.query = queryString.parse(url.split('?')[1])
//   console.log('req.query: ', req.query);
//   res.end(JSON.stringify(req.query))
// })

// POST method
const server = http.createServer((req, res) => {
  console.log('method: ', req.method);
  console.log('content-type: ', req.headers['content-type']);
  res.setHeader('Content-type', 'application/json ')
  let resultString = ''
  req.on('data', chunk => {
    resultString += chunk
  })
  req.on('end', () => {
    console.log('req----resultString: ', resultString);
  })
  res.end(JSON.stringify({
    'post method': 'done'
  }))
})

server.listen(3070, () => {
  console.log('http server start at 3070 port');
})
