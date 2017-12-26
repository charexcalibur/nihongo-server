
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  "questionId": String,
  "questionLevel": {
    "level": String,
    "unit": String
  },
  "questionTitle": String,
  "questionOption": {
    "1": String,
    "2": String,
    "3": String,
    "4": String
  },
  "correctAnswer": Number,
  "answerAnalysis": String 
})

module.exports = mongoose.model('Question', questionSchema)