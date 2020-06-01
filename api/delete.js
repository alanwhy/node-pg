const pgUtil = require("./../pg-con");
const express = require("express");
const router = express.Router();

// 删除记录
router.get("/delete/:uuid", async (req, res) => {
  let { uuid } = req.params;
  let pg_util = new pgUtil();
  let msg = await pg_util.delete(uuid);
  if (msg) {
    res.json({ state: 200, msg: "success" });
  }
});

module.exports = router;
