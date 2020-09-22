var express = require('express');
var router = express.Router();

var request = require('sync-request');

// import models
var nRestreint = require('../models/nrestreints')

var nRestreintOkModel = require('../models/nrestreintok');
const { db } = require('../models/nrestreints');



/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/deletAllDb',async  function(req, res, next) {

  var allInfo = await nRestreintOkModel.find();

  allInfo.map(async (item)=>{
    console.log(item._id)

    let num = item._id
    await nRestreintOkModel.remove({
      _id:ObjectId(`${num}`)
    })
  })

  var allInfo2 = await nRestreintOkModel.find();
  res.render('index', {allInfo2 });
});

router.get('/nrestreint',async function(req, res, next) {

var allNrestreint = await nRestreint.find();



allNrestreint.map(async (item,i )=> {
  let nbresult

  if (item.longitude!= "" && item.latitude!= "" ){
    let longitude = item.longitude
    let latitude = item.latitude
    let itemKey = item.ID
    console.log(item.ID)


    let horairesRaw = item.horaire  
    let horaireReplace = horairesRaw.split("|")
    
    
    var requestAdress = request('GET',`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}&type=street`)
    var response = JSON.parse(requestAdress.getBody())
    
  
    let adressApi = response.features[0].properties.name
    let postcodeApi = response.features[0].properties.postcode
    let distanceApi = response.features[0].properties.distance
    let cityApi = response.features[0].properties.city
    let deptApi = response.features[0].properties.postcode[0] + response.features[0].properties.postcode[1]
  /*

    await nRestreint.updateOne(
      { ID: itemKey},
     { 
      restreint: false,
      horaires: adressApi, 
      adress : longitude,
      postcode :longitude,
      city: longitude,
      dep:longitude,
        }
   );
  

*/
   
    var newLab = await  new nRestreintOkModel({

      ID: item.id,
      id_ej: item.id_ej,
      finess: item.finess,
      rs: item.rs,
      cpl_loc: item.cpl_loc,
      longitude: item.longitude,
      latitude: item.latitude,
      mod_prel:item.mod_prel,
      public: item.public,
      horaire: item.horaireReplace,
      check_rdv: item.check_rdv,
      tel_rdv: item.tel_rdv,
      web_rdv: item.web_rdv,
 

      restreint: false,
      horaires: adressApi, 
      adress: longitude,
      postcode:postcodeApi,
      city: cityApi,
      dep:deptApi,

    })

    await newLab.save()
 
  }

})




  res.json( { allNrestreint });
});



router.get('/nrestreinttest',async function(req, res, next) {

 

var users = await nRestreint.findOne(
  { ID: "JaIa12VeLfUnD27l"}
)

let valeur = users.ID


await nRestreint.updateOne(
  { ID: valeur},
 { horaires:"test9",
    }
);

   
var newLab = new nRestreintOkModel({
  nom:"test",
  restreint: true,

})

await newLab.save()

    res.json({users});
  });
  

module.exports = router;
