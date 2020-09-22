var mongoose = require('mongoose');

var nrestreintokSchema = mongoose.Schema({

    ID: String,
    id_ej: String,
    finess: String,
    rs: String,
    adresse: String,
    cpl_loc: String,
    longitude: String,
    latitude: String,
    mod_prel: String,
    public: String,
    horaire: String,
    check_rdv: String,
    tel_rdv: String,
    web_rdv: String,
    restreint: String,

        horaires: String,
        adress : String,
        postcode :String,
        city: String,
        dep:String,
});


var nRestreintOkModel = mongoose.model('newbases', nrestreintokSchema);

module.exports=nRestreintOkModel;