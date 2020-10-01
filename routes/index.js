var express = require('express');
var router = express.Router();

var request = require('sync-request');
// Require the framework and instantiate it
const app = express();

// import models
var nRestreint = require('../models/non-restreints')
var Restreint = require('../models/restreints')
var nRestreintOkModel = require('../models/nrestreintok');


const { db } = require('../models/non-restreints');



/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('index', { title: 'Express' });
});




/* GET home page. */
router.post('/listpoint', async function(req, res, next) {
  console.log("requete",req.body.dept)

  let dept = req.body.dept
  let modif = dept.replace(/ /g,"");

  let liste = await nRestreintOkModel.find({
    dep:modif
  }).sort( { postcode: 1 } );
  
  //console.log(liste)

  res.json( { liste});
});




//recherche des adresses via lat & long
router.post('/adresseslistcoord',async function(req, res, next) {

  console.log("-------",req.body)

  let lon = req.body.lon
  let lat = req.body.lat
  
  /*
   lat = 48.7927087
   lon = 2.5133559
  */

  
    var list = request('GET', `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`)
    var response = JSON.parse(list.getBody())
  
  
    let name = response.features[0].properties.name
    let postCode = response.features[0].properties.postcode
    let city =response.features[0].properties.city
    let dep_Label=response.features[0].properties.context
    let dep = response.features[0].properties.postcode[0] + response.features[0].properties.postcode[1]

    let adress = {
      name:name,
      postCode:postCode,
      city:city,
      dep_code:dep, 
      dep_label:dep_Label
    }
  
    res.json({adress});
  });


/* GET home page. */
router.get('/listdept', async function(req, res, next) {
  var list = request('GET', `https://geo.api.gouv.fr/departements`)
  var response = JSON.parse(list.getBody())

  res.json( { response});
});


router.get('/datemaj', async function(req, res, next) {
 
  var response = "Dimanche 27 Septembre 2020"

  res.json( { response});
});



//const spServerPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
//app.listen(spServerPort, () => console.log('Example app listening on port '));
module.exports = router;