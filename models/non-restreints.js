var mongoose = require('mongoose');

var nrestreintSchema = mongoose.Schema({

    ID: String,
    id_ej: String,
    finess: String,
    rs: String,
    adresse: String,
    cpl_loc: String,
    longitude: Number,
    latitude: Number,
    mod_prel: String,
    public: String,
    horaire: String,
    check_rdv: String,
    tel_rdv: String,
    web_rdv: String,
    restreint:String,

    adress : String,
    postcode :String,
    city: String,
    dep:String,
    distUser:String,

});


var nRestreintModel = mongoose.model('nrestreints', nrestreintSchema);

module.exports=nRestreintModel;