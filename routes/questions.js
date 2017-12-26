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
    questionTitle: req.body.questionTitle,
    questionOptions: req.body.questionOptions,
    answerAnalysis: req.body.answerAnalysis
  }, (error, Questions) => {
     if (error) {
        res.json({
          status: '1',
          msg: error.message
        })
     } else {
       console.log("添加成功")
     }
  })
})

module.exports = router;