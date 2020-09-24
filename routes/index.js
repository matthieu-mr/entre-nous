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

      restrint: false,
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
  console.log("requete",req.body.dept)

  let dept = req.body.dept
  let modif = dept.replace(/ /g,"");

  let liste = await nRestreintOkModel.find({
    dep:modif
  }).sort( { postcode: 1 } );
  

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
  

  router.post('/labinfo',async function(req, res, next) {
    console.log(req.body)

    let idFront =req.body.idLab

    let idModif = idFront.replace(/ /,"");
    console.log("recup info" , idModif)

    let infolab = await nRestreintOkModel.findOne(
      { ID: idFront}
    )
  
    let horaireReplaceRaw = infolab.horaire.split("|")
    let horaireReplace =[]

    horaireReplaceRaw.map((item,i)=> {
      let modif = item.replace(/ /,"");
      item[i] = modif
      
    let newItem = modif.charAt(0).toUpperCase() + modif.substring(1).toLowerCase()
    horaireReplace.push(newItem)
   
    })
    

    res.json({infolab,horaireReplace});
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





module.exports = router;
