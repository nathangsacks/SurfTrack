const express = require("express");
const router = express.Router();
 
const sessaoController = require("../controllers/sessaoController");
 
router.post("/registrar", function (req, res) {
    sessaoController.registrar(req, res);
});
 
router.get("/ultimas/:idUsuario", function (req, res) {
    sessaoController.listarUltimas(req, res);
});
 
router.get("/indicadores/:idUsuario", function (req, res) {
    sessaoController.buscarIndicadores(req, res);
});
 
router.get("/praias/:idUsuario", function (req, res) {
    sessaoController.buscarPraiasMaisSurfadas(req, res);
});
 
module.exports = router;