
function cadastrar() {

    var nome = document.getElementById("nome_input").value;
    var email = document.getElementById("email_input").value;
    var senha = document.getElementById("senha_input").value;
    var confirmacao = document.getElementById("confirmacao_input").value;

    var mensagemErro = document.getElementById("mensagem_erro");
    var mensagemSucesso = document.getElementById("mensagem_sucesso");

    mensagemErro.innerHTML = "";
    mensagemSucesso.innerHTML = "";

    var temMaiuscula = false;
    var temMinuscula = false;
    var temNumero = false;

    // Percorre todos os caracteres da senha
    for (var i = 0; i < senha.length; i++) {

        var caractere = senha[i];

        if (caractere >= "A" && caractere <= "Z") {
            temMaiuscula = true;
        }

        if (caractere >= "a" && caractere <= "z") {
            temMinuscula = true;
        }

        if (caractere >= "0" && caractere <= "9") {
            temNumero = true;
        }
    }

    // Validações do cadastro
    if (nome.trim() == "" || email.trim() == "" ||
        senha == "" || confirmacao == "") {

        mensagemErro.innerHTML = "Preencha todos os campos.";

    } else if (nome.trim().length < 3) {

        mensagemErro.innerHTML = "Informe um nome válido.";

    } else if (!email.includes("@") || !email.includes(".")) {

        mensagemErro.innerHTML = "Informe um e-mail válido.";

    } else if (senha.length < 8) {

        mensagemErro.innerHTML =
            "A senha deve ter pelo menos 8 caracteres.";

    } else if (!temMaiuscula) {

        mensagemErro.innerHTML =
            "A senha deve conter pelo menos uma letra maiúscula.";

    } else if (!temMinuscula) {

        mensagemErro.innerHTML =
            "A senha deve conter pelo menos uma letra minúscula.";

    } else if (!temNumero) {

        mensagemErro.innerHTML =
            "A senha deve conter pelo menos um número.";

    } else if (senha != confirmacao) {

        mensagemErro.innerHTML =
            "As senhas não coincidem.";

      } else {

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                mensagemSucesso.innerHTML = "Cadastro realizado! Redirecionando para o login...";
                setTimeout(function () {
                    window.location = "./login.html";
                }, 2000);
            } else {
                mensagemErro.innerHTML = "Houve um erro ao realizar o cadastro.";
            }
        }).catch(function (erro) {
            console.log(erro);
            mensagemErro.innerHTML = "Não foi possível conectar ao servidor.";
        });
    }
}


// Impede que o formulário recarregue a página
document.getElementById("form_cadastro")
    .addEventListener("submit", function(evento) {

        evento.preventDefault();
        cadastrar();

    });


// Mostrar ou ocultar senha
function mostrarSenha(idCampo, botao) {

    var campo = document.getElementById(idCampo);

    if (campo.type == "password") {
        campo.type = "text";
        botao.innerHTML = "Ocultar";
    } else {
        campo.type = "password";
        botao.innerHTML = "Mostrar";
    }
}
