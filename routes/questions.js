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
    questionUnity: req.body.questionUnity,
    questionTitle: req.body.questionTitle,
    option_1: req.body.option_1,
    option_2: req.body.option_2,
    option_3: req.body.option_3,
    option_4: req.body.option_4,
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

router.get("/show", (req, res, next) => {
  let Questions = require('../models/questions')

  Questions.find((error, Questions) => {
    if(error) {
      res.json({
        status: '1',
        msg: error.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: Questions
      })
    }
  })
})

module.exports = router;