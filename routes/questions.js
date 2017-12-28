'use strict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Questions = require('../models/questions')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/nihongo')

mongoose.connection.on("connected",function () {
  console.log("MongoDB connected success");
});

mongoose.connection.on("error",function () {
   console.log("MongoDB connected fail");
});

mongoose.connection.on("disconnected",function () {
   console.log("MongoDB is disconnected");
});

router.post("/add", (req, res, next) => {
  // let questionId = req.body.questionId,
  //     questionLevel = req.body.questionLevel,
  //     questionTitle = req.body.questionTitle,
  //     questionOptions = req.body.questionOptions,
  //     answerAnalysis = req.body.answerAnalysis
  
  let Questions = require('../models/questions')

  Questions.create({
    questionId: req.body.questionId,
    questionLevel: req.body.questionLevel,
    questionUnit: req.body.questionUnit,
    questionTitle: req.body.questionTitle,
    option_1: req.body.option_1,
    option_2: req.body.option_2,
    option_3: req.body.option_3,
    option_4: req.body.option_4,
    correctAnswer: req.body.correctAnswer,
    answerAnalysis: req.body.answerAnalysis
  }, (error, Questions) => {
     if (error) {
        res.json({
          status: '1',
          msg: error.message
        })
     } else {
       console.log("添加成功")
       res.json({
        status: '0',
        msg: '添加成功'
      })
     }
  })
})

router.get('/num', (req, res, next) => {
  let Questions = require('../models/questions')

  Questions.find((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length
        }
      })
    }
  })
})

router.get("/show", (req, res, next) => {
  let Questions = require('../models/questions')
  let currentPage = parseInt(req.param('currentPage'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (currentPage-1)*pageSize
  let params = {}

  let questionsModel = Questions.find(params).skip(skip).limit(pageSize)
  questionsModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          list: doc
        }
      })
    }
  })
})

router.post('/del', (req, res, next) => {
  let Questions = require('../models/questions')

  let questionId = req.body.questionId

  Questions.remove({questionId: questionId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: 'del'
      })
    }
  })
})

module.exports = router;