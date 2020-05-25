# 基于 node、express 和 postgre 的增删改查接口 demo

### 版本说明

- node:14.2.0

### pg-con.js

数据库连接池

### index.js

入口文件，接口暴露文件

### 依赖说明

cors： 解决客户端跨域问题

node-uuid： 自动生成 uuid

pg：链接 postgre 必要

body-parser：解析请求体

url：解析 get 请求参数 返回对象

hotnode：热更新 node 项目 （需要全局安装`npm i -g hotnode`）

### 如何开始？

1. 修改 pg-con.js 中的数据库配置 pgConfig
2. cmd 中直接 `npm start` 启动项目即可
