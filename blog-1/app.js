const querystring = require("querystring");
const { get, set } = require("./src/db/redis");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { access } = require("./src/utils/log");


// session data
// const SESSION_DATA = {};

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
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);
  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach(item => {
    if(!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  }); 
  // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userid
  // if(userId) {
  //   if(!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   }
  // } else {
  //   needSetCookie = true;
  //    userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  // }
  // req.session = SESSION_DATA[userId];

  // 解析session（使用redis）
  let needSetCookie = false;
  let userId = req.cookie.userid
  if(!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }
  // 获取session
  req.sessionId = userId
  get(userId).then(sessionData => {
    if(sessionData == null) {
      // 初始化redis中的session值
      set(req.sessionId, {});
      // 设置session
      req.session = {};
    }
    req.session = sessionData
    return getPostData(req)
  }).then((postData) => {
    req.body = postData;
    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      if(needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toGMTString()}`);
      }
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      })
      return;
    }

    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      if(needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toGMTString()}`);
      }
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
