const express = require('express');
const router = express.Router();
const axios = require('axios')
const cors = require('cors')

//mongoose.connect("mongodb+srv://john:Mongojaguar1@laracluster0.wpvro.mongodb.net/LARA-survey?retryWrites=true&w=majority")

router.use(cors())
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
