'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const idsSchema = new Schema({
  user_id: Number
})

module.exports = mongoose.model('Ids', idsSchema)