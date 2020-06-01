const pgUtil = require("./../pg-con");
const express = require("express");
const router = express.Router();

// 业务需求 也是更新
router.post("/examine", async (req, res) => {
  let { uuid, state } = req.body;
  let pg_util = new pgUtil();
  let msg = await pg_util.examine(uuid, state);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});

module.exports = router;
