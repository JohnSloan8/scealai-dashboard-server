const mongoose = require("mongoose")

const CoordSchema = new mongoose.Schema({
	name: {
    type: String,
    required: true,
  },
	url: {
    type: String,
    required: true,
  },
	coords: {
    type: Array,
    required: true,
  }
})

const CoordModel = mongoose.model("Coords", CoordSchema)
module.exports = CoordModel
