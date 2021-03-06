const url = require("url");
const pgUtil = require("./../pg-con");
const express = require("express");
const router = express.Router();

// 查询
router.get("/query", async (req, res) => {
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

module.exports = router;
