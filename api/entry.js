// 请求api入口文件
const express = require("express");
const router = express.Router();
const path = "/";

const query = require("./query");
const queryBySql = require("./queryBySql");
const insert = require("./insert");
const update = require("./update");
const delete1 = require("./delete");
const examine = require("./examine");

router.use(path, query);
router.use(path, queryBySql);
router.use(path, insert);
router.use(path, update);
router.use(path, delete1);
router.use(path, examine);

module.exports = router;
