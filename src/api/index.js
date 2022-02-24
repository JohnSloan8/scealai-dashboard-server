const express = require('express');
const emojis = require('./emojis');
const picturebook = require('./picturebook');
const router = express.Router();
const mongoose = require("mongoose")
const CreatedSurveyModel = require("../models/CreatedSurveys")
const CoordModel = require("../models/PictureBookCoords")
const axios = require('axios')
const cors = require('cors')

//mongoose.connect("mongodb+srv://john:Mongojaguar1@laracluster0.wpvro.mongodb.net/LARA-survey?retryWrites=true&w=majority")

router.use(cors())
router.use('/emojis', emojis);
router.use('/picturebook', picturebook);

router.get("/getCreatedSurveys", (req, res) => {
	CreatedSurveyModel.find({}, (err, result) => {
		console.log('result:', result)
		if (err) {
			res.json(err)
		} else {
			res.json(result)
		}
	})
})

router.get("/getSurveyById/:id", (req, res) => {
	CreatedSurveyModel.findById(req.params.id, (err, result) => {
		console.log('result:', result)
		if (err) {
			res.json(err)
		} else {
			res.json(result)
		}
	})
})

router.post("/createSurvey", async (req, res) => {
	console.log('req.body:', req.body)
	const createdSurvey = req.body;
	const newCreatedSurvey = new CreatedSurveyModel(createdSurvey);
	await newCreatedSurvey.save();
	res.json(createdSurvey);
})

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});


router.get("/getCoord", (req, res) => {
	CoordModel.find({}, (err, result) => {
		console.log('result:', result)
		if (err) {
			res.json(err)
		} else {
			res.json(result)
		}
	})
})

router.post("/createCoord", async (req, res) => {
	console.log('req.body:', req.body)
	console.log('req.body.name:', req.body.name)
	CoordModel.findOne({name: req.body.name}, async (err, result) => {
		if (err) {
			res.json(err)
		} else {
			if (result === null) {
				const coord = req.body;
				const newCoord = new CoordModel(coord);
				await newCoord.save();	
				console.log('newCoord:', newCoord)
				res.json(coord);
			} else {
				result.coords = req.body.coords
				await result.save()
				console.log('result:', result)
			}
		}
	})
})

router.get("/getCoordByURL/:id", (req, res) => {
	CoordModel.find({name: req.params.id}, (err, result) => {
		console.log('result:', result)
		if (err) {
			res.json(err)
		} else {
			res.json(result)
		}
	})
})

router.get("/getBookList", (req, res) => {
	axios
			 .get(
				 "https://www.issco.unige.ch/en/research/projects/callector/word_locations/metadata.json"
			 )
			 .then(json => {
				 console.log('getBookList:', json.data.texts)
				 res.json(json.data.texts)
			 })
			 .catch( err =>
					res.json(err)
			 )
})

router.get("/getBook/:id", (req, res) => {
	console.log('req.params.id:', req.params.id)
	axios
			 .get(
				 encodeURI("https://www.issco.unige.ch/en/research/projects/callector/word_locations/" + req.params.id + "/word_locations.json")
			 )
			 .then(json =>	
				 res.json(json.data)
			 )
			 .catch( err =>
					res.json(err)
			 )
})

router.post("/getIrishSynthesis", async (req, res) => {
	
  axios
    .post(
				"https://abair.ie/api2/synthesise",
				//"https://phoneticsrv3.lcs.tcd.ie/directapi/synthesise",
		{
			"synthinput": {
        "text": req.body.text,
        "ssml": "string"
      },
      "voiceparams": {
        "languageCode": "ga-IE",
        "name": "ga_UL_anb_nnmnkwii",
        "ssmlGender": "UNSPECIFIED"
      },
      "audioconfig": {
        "audioEncoding": "LINEAR16",
        "speakingRate": 1,
        "pitch": 1,
        "volumeGainDb": 1,
        "sampleRateHertz": 0,
        "effectsProfileId": []
      },
      "outputType": "JSON",
      "timing": "BOTH"
		}
      )
      .then((json) => {
				console.log('returned from json', json.data)
				res.json(json.data)
	})
})

router.post("/getIrishGramadoirCheck", async(req, res)=> {
	console.log('req.body.text:', req.body.text)
	const params = new URLSearchParams()
	params.append("teacs", req.body.text)
	params.append("teanga", "ga")
  axios
    .post(
        "https://www.abair.ie/cgi-bin/api-gramadoir-1.0.pl",
		params, 
		{
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
      )
      .then((json) => {
				console.log('returned from json', json.data)
				res.json(json.data)
	})

})

module.exports = router;
