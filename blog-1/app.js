const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);

  // 处理post data
  getPostData(req).then((postData) => {
    req.body = postData;
    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      })
      return;
    }

    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      userData.then((userData) => {
        res.end(JSON.stringify(userData));
      })
      return;
    }
    // 未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;
