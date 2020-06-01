# 基于 node、express 和 postgre 的增删改查接口 demo

### 版本说明

- node:14.2.0

### pg-con.js

数据库连接池

### index.js

入口文件，接口暴露文件

### api/*.js

数据库查询接口的相关文件

### upload.js

图片上传的接口文件

### upload/

文件上传路径

### static/img

图片文件路径存放路径

### 依赖说明

cors： 解决客户端跨域问题

node-uuid： 自动生成 uuid

pg：链接 postgre 必要

body-parser：解析请求体

url：解析 get 请求参数 返回对象

hotnode：热更新 node 项目 （需要全局安装`npm i -g hotnode`，需要修改一个文件的日志打印，启动报错的时候会有提示）

fs：文件写入读取

multer：用于处理 multipart/form-data 类型的表单数据，用于上传文件

### 如何开始？

1. 修改 pg-con.js 中的数据库配置 pgConfig
2. cmd 中直接 `npm start` 启动项目即可
