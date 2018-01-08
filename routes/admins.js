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
  let user_name = req.param('user_name')
  console.log('username: ' + user_name)
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

// 登录
router.get('/login', (req, res, next) => {
  let user_name = req.param('user_name')
  let password = req.param('password')
  console.log('user_name: ' + user_name)
  console.log('password: ' + password)
  // Admins.find({user_name: user_name}, (error, doc) => {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log(doc[0])
  //   }
  // })
  Admins.find({user_name: user_name}, (error, doc) => {
    if (error) {
      res.json({
        status: '1',
        msg: error.message
      })
    } else if (doc[0] === undefined) {
      res.json({
        status: '3',
        msg: 'unregistered!'
      })
    } else {
      let hash = doc[0].password
      console.log(doc[0].password)
      if (bcrypt.compareSync(password, hash) === false) {
        res.json({
          status: '0',
          msg: 'wrong password'
        })
      } else {
        res.cookie('username', doc[0].user_name, {
          domain: 'localhost',
          path: '/',
          maxAge: 1000*60*60
        })
        res.json({
          status: '2',
          msg: 'right password'
        })
      }
    }
  })
})

// 检查登录状态
router.get('/checkLogin', (req, res, next) => {
  console.log(req.cookies.username)
  if (req.cookies.username) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.username || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

module.exports = router;
