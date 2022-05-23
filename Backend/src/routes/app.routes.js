//Importacion de librerias, configuraciones
const { Router } = require('express');
const router = Router()

const appCtrl = require('../controllers/app.controller')

//Rutas
router.get('/getlastdata', appCtrl.getLastData);
router.get('/startcollecter', appCtrl.startCollecter);
router.post('/modificarval', appCtrl.modificarVal);
router.get('/sendval', appCtrl.sendVal);
router.get('/toexcel', appCtrl.toExcel);

// get http://ipservidor:3000/toexcel
//Exporta modulo
module.exports = router;