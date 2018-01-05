'use strict'

let dtime = require('time-formater')
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
let Admins = require('../models/admins')
let Ids = require('../models/id')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

// id自增
function getId() {
  const idData = Ids.findOne()
  idData ++
  idData.save()
  return idData
}

// 检查用户
router.get('/checkuser', (req, res, next) => {
  let user_name = req.body.user_name

  Admins.find({user_name: user_name}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg:''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          user_code: doc.length
        }
      })
    }
  })
})

// 创建用户
router.post('/create', (req, res, next) => {
  let user_name = req.body.user_name
  let password = req.body.password
  console.log(req.body)
  let status = 1
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)
  console.log('hash: ' + hash)

  Admins.create({
    user_name: user_name,
    password: hash,
    create_time: dtime().format('YYYY-MM-DD HH:mm'),
    status: status
  }, (error, doc) => {
    if (error) {
      res.json({
        status: '1',
        msg: error.message
      })
    } else {
      res.json({
        status: '0',
        msg: 'create suc'
      })
    }
  })


})

module.exports = router;
