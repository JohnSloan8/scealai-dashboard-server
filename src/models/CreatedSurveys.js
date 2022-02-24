const mongoose = require("mongoose")

const CreatedSurveySchema = new mongoose.Schema({
	date: {
    type: Date,
    required: true,
  },
	name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  sentenceSelection: {
    type: String,
    required: true,
  },
  numberSentences: {
    type: String,
    required: true,
  },
  sentenceList: {
    type: Array,
    required: true,
  },
})

const CreatedSurveyModel = mongoose.model("CreatedSurveys", CreatedSurveySchema)
module.exports = CreatedSurveyModel
