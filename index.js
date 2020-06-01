const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors()); // 解决跨域问题
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname, "/static")));

// let login = true;
// app.all("*", (req, res, next) => {
//   if (!login) {
//     return res.json("未登录");
//   }
//   next();
// });

// 路由配置
const upload = require("./upload.js");
const apiEntry = require("./api/entry");
app.use("/upload", upload);
app.use("/api", apiEntry);

app.listen(8085, () => {
  console.log("服务启动");
});
