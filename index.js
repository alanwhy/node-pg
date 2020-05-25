const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const url = require("url");
const cors = require("cors");
const pgUtil = require("./pg-con");

app.use(cors()); // 解决跨域问题
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8085, () => {
  console.log("服务启动");
});

let login = true;
app.all("*", (req, res, next) => {
  if (!login) {
    return res.json("未登录");
  }
  next();
});

// 查询
app.get("/api/query", async (req, res) => {
  var { limit, offset } = url.parse(req.url, true).query;
  let pg_util = new pgUtil();
  let msg = await pg_util.query(limit, offset);
  delete msg.fields;
  delete msg._parsers;
  delete msg._types;
  delete msg.oid;
  delete msg.RowCtor;
  delete msg.rowAsArray;
  let result = {
    state: 200,
    msg: "success",
    resultInfo: msg,
  };
  res.json(result);
});

// 查询
app.get("/api/queryBySql", async (req, res) => {
  let { sql, limit, offset } = url.parse(req.url, true).query;
  let pg_util = new pgUtil();
  let msg = await pg_util.queryBySql(sql, limit, offset);
  delete msg.fields;
  delete msg._parsers;
  delete msg._types;
  delete msg.oid;
  delete msg.RowCtor;
  delete msg.rowAsArray;
  let result = {
    state: 200,
    msg: "success",
    resultInfo: msg,
  };
  res.json(result);
});


// 插入记录
app.post("/api/insert", async (req, res) => {
  let params = req.body;
  let pg_util = new pgUtil();
  let msg = await pg_util.insert(params);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});


// 更新记录
app.post("/api/update", async (req, res) => {
  let params = req.body;
  let pg_util = new pgUtil();
  let msg = await pg_util.update(params);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});

// 删除记录
app.get("/api/delete/:uuid", async (req, res) => {
  let { uuid } = req.params;
  let pg_util = new pgUtil();
  let msg = await pg_util.delete(uuid);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});

// 业务需求 也是更新
app.post("/api/examine", async (req, res) => {
  let { uuid, state } = req.body;
  let pg_util = new pgUtil();
  let msg = await pg_util.examine(uuid, state);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});
