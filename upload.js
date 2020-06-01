const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
//上传图片的模板
var multer = require("multer");
//生成的图片放入uploads文件夹下
var upload = multer({ dest: "uploads/" });
//图片上传必须用post方法
/**
 * {
  fieldname: 'test',
  originalname: 'page.jpg', // 图片名称
  encoding: '7bit', // 编码格式
  mimetype: 'image/jpeg', // 图片类型
  destination: 'uploads/', // 图片所在文件夹
  filename: '2dbbc5828cf2446a98a5003f5771b0ce', // 文件名
  path: 'uploads\\2dbbc5828cf2446a98a5003f5771b0ce', // 路径
  size: 321336 // 大小
}*/
router.post("/img", upload.single("test"), (req, res) => {
  // 读取路径（req.file.path）
  fs.readFile(req.file.path, (err, data) => {
    // 读取失败，说明没有上传成功
    if (err) {
      return res.send("上传失败");
    }
    // 否则读取成功，开始写入
    // 我们先尝试用原文件名originalname写入吧
    // 三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数

    // 声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time =
      Date.now() +
      parseInt(Math.random() * 999) +
      parseInt(Math.random() * 2222);
    // 拓展名
    let extname = req.file.mimetype.split("/")[1];
    // 拼接成图片名
    let keepname = time + "." + extname;
    fs.writeFile(
      // 绝对路径就可以写成以下形式
      path.join(__dirname, "/static/img/" + keepname),
      data,
      (err) => {
        if (err) {
          return res.send("写入失败");
        }
        res.send({ err: 0, msg: "上传ok", data: "/img/" + keepname });
      }
    );
  });
});

module.exports = router;
