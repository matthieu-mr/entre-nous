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

  var allInfo = await nRestreint.find();

  allInfo.map(async (item)=>{
    console.log(item._id)

    let publicget = item.id_ej
    await nRestreint.deleteMany(
      { id_ej: publicget}
    )
  })


  var allInfo2 = await nRestreint.find();

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
  //  let horaireReplace = horairesRaw.split("|")
    
  //  let prelReplace = item.mod_prel.split("/")
    
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

      restreint: "false",
      horaire: horaireReplace, 
      adress: adressApi,
      postcode:postcodeApi,
      city: cityApi,
      dep:deptApi,
      distUser:"none",
        }
   );
  */


   
    var newLab = await new nRestreintOkModel({

      ID: item.id,
      id_ej: item.id_ej,
      finess: item.finess,
      rs: item.rs,
      cpl_loc: item.cpl_loc,
      longitude: item.longitude,
      latitude: item.latitude,
      mod_prel:item.mod_prel,
      public: item.public,
      horaire: horairesRaw,
      check_rdv: item.check_rdv,
      tel_rdv: item.tel_rdv,
      web_rdv: item.web_rdv,

      restrint: "false",
      adress: adressApi,
      postcode:postcodeApi,
      city: cityApi,
      dep:deptApi,
      distUser:"none",

    })

    await newLab.save()
 
  }

})


  res.json( { allNrestreint });
});


/* GET home page. */
router.post('/listpoint', async function(req, res, next) {
  let liste = await nRestreintOkModel.find({
    dep:"94"
  }
  );
  

  res.json( { liste});
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
  



/* GET home page. */
router.post('/distpoint',async function(req, res, next) {
  /*

doc : http://project-osrm.org/docs/v5.22.0/api/#general-options
ex  : http://router.project-osrm.org/route/v1/driving/13.388860,52.517037;13.397634,52.529407?overview=false
 */
 // ---- gps perso : 
let lat = 48.7927087
let lon = 2.5133559


// ----GPS autre 
let latDest = 46.2038511077026
let lonDest = 5.24185205182066

var listCentre = await nRestreintOkModel.find({
  postcode:"94100"
})
  

listCentre.map ((item)=>{

let latDest = item.latitude
let lonDest = item.longitude

var requestDist = request('GET',`http://router.project-osrm.org/route/v1/driving/${lon},${lat};${lonDest},${latDest}?overview=false`)
var response = JSON.parse(requestDist.getBody())
 
let distanceKm = response.routes[0].distance /1000  
item.distUser = distanceKm
console.log(distanceKm)

})



res.json({listCentre});

});



/* GET home page. */
router.post('/listdept',async function(req, res, next) {

let dep = 94

var requestCity = request('GET',` https://geo.api.gouv.fr/departements/${dep}/communes`)
var response = JSON.parse(requestCity.getBody())

res.json({response});

});

router.post('/villeproches',async function(req, res, next) {


/* distance villes 
var requestCity = request('GET',` https://www.villes-voisines.fr/getcp.php?cp=${cp}&rayon=50`)
var response = JSON.parse(requestCity.getBody())
 
*/


let cp = 94100

var requestCity = request('GET',` https://www.villes-voisines.fr/getcp.php?cp=${cp}&rayon=50`)
var response = JSON.parse(requestCity.getBody())
 

res.json({response});

});


//recherche des adresses via lat & long
router.post('/adressesListCoord',async function(req, res, next) {

  let lon = req.body.long
  let lat = req.body.lat
  
   lat = 48.7927087
   lon = 2.5133559
  

    // Liste des activités hors licence etc ...
  
    var list = request('GET', `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`)
    var response = JSON.parse(list.getBody())
  
  
    let name = response.features[0].properties.name
    let postCode = response.features[0].properties.postcode
    let city =response.features[0].properties.city
    let dep = response.features[0].properties.postcode[0] + response.features[0].properties.postcode[1]
    let adress = {
      name:name,
      postCode:postCode,
      city:city,
      dep:dep
    }
  
    res.json({adress});
  });

module.exports = router;
