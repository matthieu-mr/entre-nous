var mongoose = require('mongoose');

var nrestreintokSchema = mongoose.Schema({

    ID: String,
    id_ej: String,
    finess: String,
    rs: String,
    cpl_loc: String,
  

    longitude: Number,
    latitude: Number,
    mod_prel: String,
    public: String,
    horaire: String,
    check_rdv: String,
    tel_rdv: String,
    web_rdv: String,
    restrint:String,
    adress : String,
    postcode :String,
    city: String,
    dep:String,
    distUser:String,
});


var nRestreintOkModel = mongoose.model('newbases', nrestreintokSchema);

module.exports=nRestreintOkModel;