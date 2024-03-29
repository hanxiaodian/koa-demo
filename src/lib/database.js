const SequelizeCore = require('sequelize')
const Sequelize = SequelizeCore.Sequelize

console.log(`连接数据库 port:${3306}`)
const sequelize = new Sequelize('kingsoft', 'root', '1423lengyue', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    // logging: false,
    pool: {
        max: 50,
        min: 5,
        acquire: 60000,
        idle: 10000,
    }
})

sequelize.sync({
    force: false // 每次启动都重新自动创建表
})

module.exports = {
    sequelize,
    SequelizeCore
}