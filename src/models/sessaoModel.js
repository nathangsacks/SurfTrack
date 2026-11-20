const database = require("../database/config");

function registrar(idUsuario, idPraia, dataSessao, duracaoMinutos, quantidadeOndas, tamanhoPrancha, notaSessao) {
    const instrucaoSql = `
        INSERT INTO sessaoSurf (dataSessao, duracaoMinutos, quantidadeOndas, tamanhoPrancha, notasessao, fk_usuario, fk_praia)
        VALUES ('${dataSessao}', ${duracaoMinutos}, ${quantidadeOndas}, ${tamanhoPrancha}, ${notaSessao}, ${idUsuario}, ${idPraia});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUltimas(idUsuario) {
    const instrucaoSql = `
        SELECT s.idSessao,
               DATE_FORMAT(s.dataSessao, '%d/%m/%Y') AS dataFormatada,
               p.nome AS praia,
               s.duracaoMinutos,
               s.quantidadeOndas,
               s.tamanhoPrancha,
               s.notasessao AS notaSessao
        FROM sessaoSurf s
        JOIN praia p ON s.fk_praia = p.idPraia
        WHERE s.fk_usuario = ${idUsuario}
        ORDER BY s.dataSessao DESC, s.idSessao DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarIndicadores(idUsuario) {
    const instrucaoSql = `
        SELECT COUNT(idSessao) AS totalSessoes,
               COALESCE(SUM(duracaoMinutos), 0) AS totalMinutos,
               COALESCE(SUM(quantidadeOndas), 0) AS totalOndas,
               COALESCE(AVG(notasessao), 0) AS notaMedia
        FROM sessaoSurf
        WHERE fk_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPraiasMaisSurfadas(idUsuario) {
    const instrucaoSql = `
        SELECT p.nome AS praia,
               COUNT(s.idSessao) AS totalSessoes
        FROM sessaoSurf s
        JOIN praia p ON s.fk_praia = p.idPraia
        WHERE s.fk_usuario = ${idUsuario}
        GROUP BY p.idPraia, p.nome
        ORDER BY totalSessoes DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    listarUltimas,
    buscarIndicadores,
    buscarPraiasMaisSurfadas
};
