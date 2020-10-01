var express = require('express');
var router = express.Router();

var request = require('sync-request');
// Require the framework and instantiate it
const app = express();

var nRestreint = require('../models/non-restreints')
var restreint = require('../models/restreints')
var nRestreintOkModel = require('../models/nrestreintok');




router.get('/',  function(req, res, next) {
  res.json( "test2");
  });



  router.get('/deletAllDb',async  function(req, res, next) {

    var allInfo = await nRestreint.find();
  
    allInfo.map(async (item)=>{
      let publicget = item.id_ej
      await nRestreint.deleteMany(
        { id_ej: publicget}
      )
    })
  
    var allInfoRestreint = await restreint.find();
    allInfoRestreint.map(async (item)=>{
  
        let publicget = item.id_ej
      await restreint.deleteMany(
        { id_ej: publicget}
      )
    })
  
  
    var allInfo2 = await nRestreint.find();
  
    res.render('index', {allInfo2 });
  });


  
  router.get('/nrestreint',async function(req, res, next) {
  

// AogfDorFf1C8q9hz ID

  var allNrestreint = await nRestreint.find();
  
  allNrestreint.map(async (item,i )=> {
    let nbresult
  
    if (item.longitude!= "" && item.latitude!= "" ){
      let longitude = item.longitude
      let latitude = item.latitude
      let itemKey = item.ID
  
      console.log(longitude,latitude,item.ID)

      let horairesRaw = item.horaire  

      
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
  
  router.get('/restreint',async function(req, res, next) {
  
    var allNrestreint = await restreint.find();
    
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
    
          restrint: true,
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
    



  module.exports = router;