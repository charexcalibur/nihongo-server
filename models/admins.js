
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let adminSchema = new Schema({
	user_name: String,
	password: String,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number,  //1:普通管理、 2:超级管理员
})


module.exports = mongoose.model('Admin', adminSchema)