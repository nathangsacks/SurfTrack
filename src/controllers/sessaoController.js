const sessaoModel = require("../models/sessaoModel");

function registrar(req, res) {
    const idUsuario = req.body.idUsuario;
    const idPraia = req.body.idPraia;
    const dataSessao = req.body.dataSessao;
    const duracaoMinutos = req.body.duracaoMinutos;
    const quantidadeOndas = req.body.quantidadeOndas;
    const tamanhoPrancha = req.body.tamanhoPrancha;
    const notaSessao = req.body.notaSessao;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (idPraia == undefined) {
        res.status(400).send("idPraia está undefined!");
    } else if (dataSessao == undefined) {
        res.status(400).send("dataSessao está undefined!");
    } else if (duracaoMinutos == undefined) {
        res.status(400).send("duracaoMinutos está undefined!");
    } else if (quantidadeOndas == undefined) {
        res.status(400).send("quantidadeOndas está undefined!");
    } else if (tamanhoPrancha == undefined) {
        res.status(400).send("tamanhoPrancha está undefined!");
    } else if (notaSessao == undefined) {
        res.status(400).send("notaSessao está undefined!");
    } else {
        sessaoModel.registrar(idUsuario, idPraia, dataSessao, duracaoMinutos, quantidadeOndas, tamanhoPrancha, notaSessao)
            .then(function (resultado) {
                res.status(201).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao registrar a sessão! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarUltimas(req, res) {
    const idUsuario = req.params.idUsuario;

    sessaoModel.listarUltimas(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as sessões: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarIndicadores(req, res) {
    const idUsuario = req.params.idUsuario;

    sessaoModel.buscarIndicadores(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os indicadores: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPraiasMaisSurfadas(req, res) {
    const idUsuario = req.params.idUsuario;

    sessaoModel.buscarPraiasMaisSurfadas(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as praias mais surfadas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    listarUltimas,
    buscarIndicadores,
    buscarPraiasMaisSurfadas
};