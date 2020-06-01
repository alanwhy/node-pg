const pgUtil = require("./../pg-con");
const express = require("express");
const router = express.Router();

// 插入记录
router.post("/insert", async (req, res) => {
  let params = req.body;
  let pg_util = new pgUtil();
  let msg = await pg_util.insert(params);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});

module.exports = router;
