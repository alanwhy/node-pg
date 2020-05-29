const pg = require("pg");
const uuid = require("node-uuid");

var pool;
var tableName = "mine_map_tools";
class pgUtil {
  constructor() {
    if (!pool) {
      // 数据库配置
      const pgConfig = {
        host: "192.168.154.32",
        user: "postgres",
        database: "study_map_tool",
        password: "sjgt_2020",
        port: 21191,
        // 扩展属性
        max: 20, // 连接池最大连接数
        idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
      };
      // 创建连接池
      pool = new pg.Pool(pgConfig);
      pool.on("error", (e) => {
        console.error(`pg连接池错误:${e}`);
      });
    }
  }

  /**
   * 查询表数据 分页
   * @param {*} limit
   * @param {*} offset
   */
  async query(limit = 10, offset = 0) {
    let msg = await pool.query(
      `SELECT * FROM ${tableName} LIMIT ${limit} OFFSET ${offset}`
    );
    return msg;
  }

  /**
   * 条件查询
   * @param {*} sql
   * @param {*} limit
   * @param {*} offset
   */
  async queryBySql(sql = "1=1", limit = 10, offset = 0) {
    let res = await pool.query(`SELECT * FROM ${tableName} WHERE ${sql}`);
    let msg = await pool.query(
      `SELECT * FROM ${tableName} WHERE ${sql} LIMIT ${limit} OFFSET ${offset}`
    );
    msg.sum = res.rowCount;
    return msg;
  }

  /**
   * 插入一条数据
   * @param {*} data
   */
  async insert(data) {
    let {
      name,
      icon,
      type,
      img,
      help_info,
      tags,
      state,
      date,
      url,
      user_key,
      self
    } = data;
    let uid = uuid.v4();
    let msg = await pool.query(
      `INSERT INTO ${tableName} (uuid, name, icon, type, img, help_info, tags, state, date, url, user_key, self) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [uid, name, icon, type, img, help_info, tags, state, date, url, user_key, self]
    );
    return msg;
  }

  /**
   * 更新一条记录
   * @param {*} data
   */
  async update(data) {
    let {
      uuid,
      name,
      icon,
      type,
      img,
      help_info,
      tags,
      state,
      date,
      url,
      user_key,
      self
    } = data;
    let msg = await pool.query(
      `UPDATE ${tableName} SET name = $2 ,icon = $3 ,type = $4 ,img = $5 ,help_info = $6 ,tags = $7 ,state = $8 ,date = $9 ,url = $10, user_key = $11, self = $12 WHERE uuid = $1`,
      [uuid, name, icon, type, img, help_info, tags, state, date, url, user_key, self]
    );
    return msg;
  }

  /**
   * 删除一条记录
   * @param {*} uuid
   */
  async delete(uuid) {
    let msg = await pool.query(`DELETE FROM ${tableName} WHERE uuid = $1`, [
      uuid,
    ]);
    return msg;
  }

  /**
   * 审核
   * @param {*} uuid
   * @param {*} flag
   */
  async examine(uuid, state) {
    let msg = await pool.query(
      `UPDATE ${tableName} SET state = $2 WHERE uuid = $1`,
      [uuid, state]
    );
    return msg;
  }
}

module.exports = pgUtil;
