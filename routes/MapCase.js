var express = require('express');
var router = express.Router();

var request = require('sync-request');
// Require the framework and instantiate it
const app = express();

let listCoord = [
  [1, 'Ain[01]', 5.130768, 46.247571, 'Ain', 0, 0, '0', 0],
  [2, 'Aisne[02]', 3.441737, 49.47692, 'Aisne', 0, 0, '0', 0],
  [3, 'Allier[03]', 3.416765, 46.311555, 'Allier', 0, 0, '0', 0],
  [5, 'Hautes-Alpes[05]', 6.322607, 44.600872, 'Hautes-Alpes', 0, 0, '0', 0],
  [4, 'Alpes-de-Haute-Provence[04]', 6.237595, 44.077872, 'Alpes-de-Haute-Provence', 0, 0, '0', 0],
  [6, 'Alpes-Maritimes[06]', 7.179026, 43.946679, 'Alpes-Maritimes', 0, 0, '0', 0],
  [7, 'Ardèche[07]', 4.562443, 44.759629, 'Ardèche', 0, 0, '0', 0],
  [8, 'Ardennes[08]', 4.628505, 49.762464, 'Ardennes', 0, 0, '0', 0],
  [9, 'Ariège[09]', 1.443469, 42.932629, 'Ariège', 0, 0, '0', 0],
  [10, 'Aube[10]', 4.373246, 48.156342, 'Aube', 0, 0, '0', 0],
  [11, 'Aude[11]', 2.381362, 43.072467, 'Aude', 0, 0, '0', 0],
  [12, 'Aveyron[12]', 2.618927, 44.217975, 'Aveyron', 0, 0, '0', 0],
  [13, 'Bouches-du-Rhône[13]', 5.31025, 43.591168, 'Bouches-du-Rhône', 0, 0, '0', 0],
  [14, 'Calvados[14]', -117.837927, 33.610659, 'Calvados', 0, 0, '0', 0],
  [15, 'Cantal[15]', 2.632606, 45.1192, 'Cantal[15]', 0, 0, '0', 0],
  [16, 'Charente[16]', 0.153476, 45.751996, 'Charente', 0, 0, '0', 0],
  [17, 'Charente-Maritime[17]', -0.773319, 45.74949, 'Charente-Maritime', 0, 0, '0', 0],
  [18, 'Cher[18]', 2.467191, 46.954005, 'Cher', 0, 0, '0', 0],
  [19, 'Corrèze[19]', 2.019591, 45.432008, 'Corrèze', 0, 0, '0', 0],
  [20, 'Corse-du-sud[2a]', 8.924534, 41.810263, 'Corse-du-sud', 0, 0, '0', 0],
  [21, 'Haute-corse[2b]', 9.278558, 42.409788, 'Haute-corse', 0, 0, '0', 0],
  [22, 'Côte-d or[21]', 4.635412, 47.51268, 'Côte-d or', 0, 0, '0', 0],
  [23, 'Côtes-d armor[22]', -3.326368, 48.51081, 'Côtes-d armor', 0, 0, '0', 0],
  [24, 'Creuse[23]', 2.062783, 46.037763, 'Creuse', 0, 0, '0', 0],
  [25, 'Dordogne[24]', 0.757221, 45.146949, 'Dordogne', 0, 0, '0', 0],
  [26, 'Doubs[25]', 6.3126, 47.196982, 'Doubs', 0, 0, '0', 0],
  [27, 'Drôme[26]', 5.226667, 44.73119, 'Drôme', 0, 0, '0', 0],
  [28, 'Eure[27]', 0.958211, 49.118176, 'Eure', 0, 0, '0', 0],
  [29, 'Eure-et-Loir[28]', 1.198981, 48.552524, 'Eure-et-Loir', 0, 0, '0', 0],
  [30, 'Finistère[29]', -3.930052, 48.252025, 'Finistère', 0, 0, '0', 0],
  [31, 'Gard[30]', 4.151376, 43.9447, 'Gard', 0, 0, '0', 0],
  [32, 'Haute-Garonne[31]', 1.135302, 43.401046, 'Haute-Garonne', 0, 0, '0', 0],
  [33, 'Gers[32]', 0.450237, 43.636648, 'Gers', 0, 0, '0', 0],
  [34, 'Gironde[33]', -0.450237, 44.849665, 'Gironde', 0, 0, '0', 0],
  [35, 'Hérault[34]', 3.258363, 43.591236, 'Hérault', 0, 0, '0', 0],
  [36, 'Ile-et-Vilaine[35]', -1.530069, 48.229202, 'Ile-et-Vilaine', 0, 0, '0', 0],
  [37, 'Indre[36]', 1.448266, 46.661397, 'Indre', 0, 0, '0', 0],
  [38, 'Indre-et-Loire[37]', 0.816097, 47.289492, 'Indre-et-Loire', 0, 0, '0', 0],
  [39, 'Isère[38]', 5.929348, 44.995775, 'Isère', 0, 0, '0', 0],
  [40, 'Jura[39]', 5.672916, 46.762475, 'Jura', 0, 0, '0', 0],
  [41, 'Landes[40]', -0.753281, 43.941205, 'Landes', 0, 0, '0', 0],
  [42, 'Loir-et-Cher[41]', 1.415907, 47.676191, 'Loir-et-Cher', 0, 0, '0', 0],
  [43, 'Loire[42]', 4.052545, 45.984648, 'Loire', 0, 0, '0', 0],
  [44, 'Haute-Loire[43]', 3.926637, 45.082123, 'Haute-Loire', 0, 0, '0', 0],
  [45, 'Loire-Atlantique[44]', -1.815765, 47.278047, 'Loire-Atlantique', 0, 0, '0', 0],
  [46, 'Loiret[45]', 2.201817, 47.900771, 'Loiret', 0, 0, '0', 0],
  [47, 'Lot[46]', 1.676069, 44.537936, 'Lot', 0, 0, '0', 0],
  [48, 'Lot-et-Garonne[47]', 0.450237, 44.247017, 'Lot-et-Garonne', 0, 0, '0', 0],
  [49, 'Lozère[48]', 3.581269, 44.494203, 'Lozère', 0, 0, '0', 0],
  [50, 'Maine-et-Loire[49]', -0.487785, 47.291355, 'Maine-et-Loire', 0, 0, '0', 0],
  [51, 'Manche[50]', -1.311595, 49.114712, 'Manche', 0, 0, '0', 0],
  [52, 'Marne[51]', 4.147544, 49.128754, 'Marne', 0, 0, '0', 0],
  [53, 'Haute-Marne[52]', 5.107132, 48.126097, 'Haute-Marne', 0, 0, '0', 0],
  [54, 'Mayenne[53]', -0.504256, 48.23825, 'Mayenne', 0, 0, '0', 0],
  [55, 'Meurthe-et-Moselle[54]', 6.094701, 48.799701, 'Meurthe-et-Moselle', 0, 0, '0', 0],
  [56, 'Meuse[55]', 5.2824, 49.082432, 'Meuse', 0, 0, '0', 0],
  [57, 'Morbihan[56]', -2.900187, 47.885293, 'Morbihan', 0, 0, '0', 0],
  [58, 'Moselle[57]', 6.552764, 49.098384, 'Moselle', 0, 0, '0', 0],
  [59, 'Nièvre[58]', 3.529452, 47.238171, 'Nièvre', 0, 0, '0', 0],
  [60, 'Nord[59]', 3.264244, 50.385125, 'Nord', 0, 0, '0', 0],
  [61, 'Oise[60]', 2.41464, 49.421457, 'Oise', 0, 0, '0', 0],
  [62, 'Orne[61]', 0.08482, 48.638857, 'Orne', 0, 0, '0', 0],
  [63, 'Pas-de-Calais[62]', 2.324468, 50.573277, 'Pas-de-Calais', 0, 0, '0', 0],
  [64, 'Puy-de-Dôme[63]', 3.015582, 45.712414, 'Puy-de-Dôme', 0, 0, '0', 0],
  [65, 'Pyrénées-Atlantiques[64]', -0.753281, 43.326994, 'Pyrénées-Atlantiques', 0, 0, '0', 0],
  [66, 'Hautes-Pyrénées[65]', 0.149499, 43.019392, 'Hautes-Pyrénées', 0, 0, '0', 0],
  [67, 'Pyrénées-Orientales[66]', 2.539603, 42.601291, 'Pyrénées-Orientales', 0, 0, '0', 0],
  [68, 'Bas-Rhin[67]', 7.525294, 48.634317, 'Bas-Rhin', 0, 0, '0', 0],
  [69, 'Haut-Rhin[68]', 7.24411, 47.931504, 'Haut-Rhin', 0, 0, '0', 0],
  [70, 'Rhône[69]', 4.610804, 45.735146, 'Rhône', 0, 0, '0', 0],
  [71, 'Haute-Saône[70]', 6.155628, 47.756981, 'Haute-Saône', 0, 0, '0', 0],
  [72, 'Saône-et-Loire[71]', 4.486671, 46.582751, 'Saône-et-Loire', 0, 0, '0', 0],
  [73, 'Sarthe[72]', 0.16558, 47.921701, 'Sarthe', 0, 0, '0', 0],
  [74, 'Savoie[73]', 6.4724, 45.493205, 'Savoie', 0, 0, '0', 0],
  [75, 'Haute-Savoie[74]', 6.538962, 46.175679, 'Haute-Savoie', 0, 0, '0', 0],
  [76, 'Paris[75]', 2.352215, 48.856582, 'Paris', 0, 0, '0', 0],
  [77, 'Seine-Maritime[76]', 0.974844, 49.605419, 'Seine-Maritime', 0, 0, '0', 0],
  [78, 'Seine-et-Marne[77]', 2.999366, 48.841082, 'Seine-et-Marne', 0, 0, '0', 0],
  [79, 'Yvelines[78]', 1.825657, 48.785094, 'Yvelines', 0, 0, '0', 0],
  [80, 'Deux-Sèvres[79]', -0.396284, 46.592654, 'Deux-Sèvres', 0, 0, '0', 0],
  [81, 'Somme[80]', 2.27071, 49.914518, 'Somme', 0, 0, '0', 0],
  [82, 'Tarn[81]', 1.988153, 43.92644, 'Tarn', 0, 0, '0', 0],
  [83, 'Tarn-et-Garonne[82]', 1.289104, 44.012668, 'Tarn-et-Garonne', 0, 0, '0', 0],
  [84, 'Var[83]', 6.237595, 43.467646, 'Var', 0, 0, '0', 0],
  [85, 'Vaucluse[84]', 5.143207, 44.056505, 'Vaucluse', 0, 0, '0', 0],
  [86, 'Vendée[85]', -1.448266, 46.661397, 'Vendée', 0, 0, '0', 0],
  [87, 'Vienne[86]', 0.477286, 46.669542, 'Vienne', 0, 0, '0', 0],
  [88, 'Haute-Vienne[87]', 1.402548, 45.743517, 'Haute-Vienne', 0, 0, '0', 0],
  [89, 'Vosges[88]', 6.335593, 48.144643, 'Vosges', 0, 0, '0', 0],
  [90, 'Yonne[89]', 3.607982, 47.865273, 'Yonne', 0, 0, '0', 0],
  [91, 'Territoire de Belfort[90]', 6.920772, 47.594657, 'Territoire de Belfort', 0, 0, '0', 0],
  [92, 'Essonne[91]', 2.156942, 48.45857, 'Essonne', 0, 0, '0', 0],
  [93, 'Hauts-de-Seine[92]', 2.218807, 48.828508, 'Hauts-de-Seine', 0, 0, '0', 0],
  [94, 'Seine-Saint-Denis[93]', 2.357443, 48.936181, 'Seine-Saint-Denis', 0, 0, '0', 0],
  [95, 'Val-de-Marne[94]', 2.474034, 48.793143, 'Val-de-Marne', 0, 0, '0', 0],
  [96, 'Val-d oise[95]', 2.158135, 49.06159, 'Val-d oise', 0, 0, '0', 0],
  [97, 'Mayotte[976]', 45.232242, -12.755121, 'Mayotte', 0, 0, '0', 0],
  [98, 'Guadeloupe[971]', -82.426337, 27.104463, 'Guadeloupe', 0, 0, '0', 0],
  [99, 'Guyane[973]', -52.3001, 4.926615, 'Guyane', 0, 0, '0', 0],
  [100, 'Martinique[972]', -96.745316, 32.798854, 'Martinique', 0, 0, '0', 0],
  [101, 'Réunion[974]', 55.45834, -20.88837, 'Réunion', 0, 0, '0', 0]
  ]
  


router.get('/',  function(req, res, next) {

  var requestAdress = request('GET',`https://coronavirusapi-france.now.sh/AllLiveData`)
  var responseRaw = JSON.parse(requestAdress.getBody())
  
  var dataRaw = responseRaw.allLiveFranceData

   dataRaw.map((item,i)=>{
    console.log(item.nom)
    
    listCoord.map((value,j)=>{
      if (value[4]==item.nom){
          item.longitude = value[2],
          item.latitude = value[3],
          item.numDept=value[0]
      }
    })
    
  })

res.json( { dataRaw });
});
 

router.get('/deptcase',  function(req, res, next) {

  var requestAdress = request('GET',`https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=Rh%C3%B4ne`)
  var responseRaw = JSON.parse(requestAdress.getBody())
  
  var dataRaw = responseRaw.allDataByDepartement
  
let result =[]
let number =0

dataRaw.map((item,i)=>{
var dateBase = new Date("2020-04-01")
var itemDate = new Date(item.date)

    if (itemDate> dateBase){
      console.log(item.date,  number++)
      number +1

      let infoSend ={
        number:number,
        date:item.date, 
        hospitalises:item.hospitalises,
        reanimation:item.reanimation,
        nouvellesHospitalisations:item.nouvellesHospitalisations,
        nouvellesReanimations:item.nouvellesReanimations,
        deces:item.deces,
        gueris:item.gueris
      }

      result.push(infoSend)

    }

})


res.json( {number,result });
});
 




module.exports = router;
