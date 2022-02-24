const mongoose = require("mongoose")

const PictureBookSchema = new mongoose.Schema({
	name: {
    type: String,
    required: true,
  },
	book: {
    type: Object,
    required: false
  },
	prefixURL: {
    type: String,
    required: true
  }
})

const PictureBookModel = mongoose.model("PictureBook", PictureBookSchema)
module.exports = PictureBookModel
