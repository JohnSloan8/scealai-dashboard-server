const express = require('express');
const PictureBookModel = require("../models/PictureBook")
const router = express.Router();
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://john:Mongojaguar1@laracluster0.wpvro.mongodb.net/LARA-Picturebook?retryWrites=true&w=majority")

router.get("/getAllPictureBookNames", (req, res) => {
	PictureBookModel.find({}, (err, result) => {
		if (err) {
			res.json(err)
		} else {
			let nameList = []
			result.forEach(n => nameList.push(n.name))
			res.json(nameList)
		}
	})
})

router.post("/createPictureBook", async (req, res) => {
	//console.log('req.body:', req.body)
	//console.log('req.body.name:', req.body.name)
	PictureBookModel.findOne({name: req.body.name}, async (err, result) => {
		if (err) {
			res.json(err)
		} else {
			if (result === null) {
				const coord = req.body;
				const newCoord = new PictureBookModel(coord);
				await newCoord.save();	
				//console.log('newCoord:', newCoord)
				res.json(coord);
			} else {
				result.coords = req.body.coords
				await result.save()
				//console.log('result:', result)
			}
		}
	})
})

router.get("/getPictureBookByName/:id", (req, res) => {
	PictureBookModel.find({name: req.params.id}, (err, result) => {
		console.log('result:', result)
		if (err) {
			res.json(err)
		} else {
			res.json(result)
		}
	})
})

router.get("/getPictureBookList", (req, res) => {
	axios
			 .get(
				 "https://www.issco.unige.ch/en/research/projects/callector/word_locations/metadata.json"
			 )
			 .then(json =>
				
				 res.json(json.data)
			 )
			 .catch( err =>
					res.json(err)
			 )
})

router.get("/getPictureBook/:id", (req, res) => {
	console.log('req.params.id:', req.params.id)
	axios
			 .get(
				 "https://www.issco.unige.ch/en/research/projects/callector/word_locations/" + req.params.id + "/word_locations.json"
			 )
			 .then(json =>	
				 res.json(json.data)
			 )
			 .catch( err =>
					res.json(err)
			 )
})


module.exports = router;
