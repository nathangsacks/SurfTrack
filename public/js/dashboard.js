const idUsuario = sessionStorage.ID_USUARIO;
const nomeUsuario = sessionStorage.NOME_USUARIO;

if (idUsuario == undefined) {
    window.location = "./login.html";
}

document.getElementById("nome_usuario").innerHTML = nomeUsuario;

function formatarNumero(valor, casas) {
    return Number(valor).toFixed(casas).replace(".", ",");
}

function carregarIndicadores() {
    fetch(`/sessoes/indicadores/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    const totalMinutos = Number(dados.totalMinutos);
                    const horas = Math.floor(totalMinutos / 60);
                    const minutos = totalMinutos % 60;

                    document.getElementById("total_sessoes").innerHTML = dados.totalSessoes;
                    document.getElementById("tempo_total").innerHTML = `${horas}h ${minutos}min`;
                    document.getElementById("total_ondas").innerHTML = dados.totalOndas;
                    document.getElementById("nota_media").innerHTML = formatarNumero(dados.notaMedia, 1);
                });
            } else {
                console.log("Erro ao buscar os indicadores.");
            }
        }).catch(function (erro) {
            console.log(erro);
        });
}

function carregarUltimasSessoes() {
    const tabela = document.getElementById("tabela_sessoes");

    fetch(`/sessoes/ultimas/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (sessoes) {
                    if (sessoes.length == 0) {
                        tabela.innerHTML = `
                            <tr>
                                <td colspan="6" class="sem-sessoes">
                                    Nenhuma sessão registrada ainda.
                                </td>
                            </tr>`;
                        return;
                    }

                    tabela.innerHTML = "";

                    for (let i = 0; i < sessoes.length; i++) {
                        const sessao = sessoes[i];

                        tabela.innerHTML += `
                            <tr>
                                <td>${sessao.dataFormatada}</td>
                                <td>${sessao.praia}</td>
                                <td>${sessao.duracaoMinutos} min</td>
                                <td>${sessao.quantidadeOndas}</td>
                                <td>${formatarNumero(sessao.tamanhoPrancha, 1)} pés</td>
                                <td>${sessao.notaSessao}</td>
                            </tr>`;
                    }
                });
            } else {
                console.log("Erro ao buscar as sessões.");
            }
        }).catch(function (erro) {
            console.log(erro);
        });
}

function carregarGraficoPraias() {
    const grafico = document.getElementById("grafico_praias");

    fetch(`/sessoes/praias/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (praias) {
                    if (praias.length == 0) {
                        grafico.innerHTML = `
                            <p class="sem-dados-grafico">
                                Nenhuma sessão registrada ainda.
                            </p>`;
                        return;
                    }

                    const maior = Number(praias[0].totalSessoes);

                    grafico.innerHTML = "";

                    for (let i = 0; i < praias.length; i++) {
                        const largura = (Number(praias[i].totalSessoes) / maior) * 100;

                        grafico.innerHTML += `
                            <div class="linha-grafico">
                                <span class="nome-praia">${praias[i].praia}</span>
                                <div class="fundo-barra">
                                    <div class="barra-praia" style="width: ${largura}%"></div>
                                </div>
                                <span class="quantidade-sessoes">${praias[i].totalSessoes}</span>
                            </div>`;
                    }
                });
            } else {
                console.log("Erro ao buscar as praias mais surfadas.");
            }
        }).catch(function (erro) {
            console.log(erro);
        });
}

function carregarDashboard() {
    carregarIndicadores();
    carregarUltimasSessoes();
    carregarGraficoPraias();
}

function registrarSessao() {
    const mensagem = document.getElementById("mensagem_sessao");

    const dataSessao = document.getElementById("input_data").value;
    const idPraia = document.getElementById("select_praia").value;
    const duracaoMinutos = document.getElementById("input_duracao").value;
    const quantidadeOndas = document.getElementById("input_ondas").value;
    const tamanhoPrancha = document.getElementById("input_prancha").value;
    const notaSessao = document.getElementById("input_nota").value;

    mensagem.innerHTML = "";

    fetch("/sessoes/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idUsuario: idUsuario,
            idPraia: idPraia,
            dataSessao: dataSessao,
            duracaoMinutos: duracaoMinutos,
            quantidadeOndas: quantidadeOndas,
            tamanhoPrancha: tamanhoPrancha,
            notaSessao: notaSessao
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            mensagem.innerHTML = "Sessão registrada com sucesso!";
            document.getElementById("form_sessao").reset();
            carregarDashboard();
        } else {
            mensagem.innerHTML = "Houve um erro ao registrar a sessão.";
        }
    }).catch(function (erro) {
        console.log(erro);
        mensagem.innerHTML = "Não foi possível conectar ao servidor.";
    });
}

document.getElementById("form_sessao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    registrarSessao();
});

carregarDashboard();