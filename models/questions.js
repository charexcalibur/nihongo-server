
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  "questionId": String,
  "questionLevel": String,
  "questionUnit": String,
  "questionTitle": String,
  "option_1": String,
  "option_2": String,
  "option_3": String,
  "option_4": String,
  "correctAnswer": Number,
  "answerAnalysis": String 
})

module.exports = mongoose.model('Question', questionSchema)