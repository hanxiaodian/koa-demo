// import * as Sequelize from 'sequelize'
const { sequelize, SequelizeCore } = require('../lib/database.js')
const Model = SequelizeCore.Model

class User extends Model {}

User.init({
    id: { type: SequelizeCore.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
    nickName: { type: SequelizeCore.STRING, field: 'nickName', comment: '用户昵称', allowNull: false },
    phone: { type: SequelizeCore.STRING, field: 'phone', comment: '用户手机号', allowNull: false },
    country: { type: SequelizeCore.STRING, field: 'country', comment: '用户所在国家', allowNull: true },
    regTime: { type: SequelizeCore.DATE(3), field: 'regTime', comment: '注册时间', allowNull: false },
    lastLogin: { type: SequelizeCore.DATE(3), field: 'lastLogin', comment: '最后登陆时间', allowNull: false },
}, {
    tableName: 'user',
    timestamps: true,
    sequelize,
})

exports.User = User