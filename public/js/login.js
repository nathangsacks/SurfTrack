function entrar() {
    var email = document.getElementById("email_input").value;
    var senha = document.getElementById("senha_input").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    mensagemErro.innerHTML = "";

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                window.location = "./dashboard.html";
            });
        } else {
            mensagemErro.innerHTML = "E-mail e/ou senha inválido(s).";
        }
    }).catch(function (erro) {
        console.log(erro);
        mensagemErro.innerHTML = "Não foi possível conectar ao servidor.";
    });
}

document.getElementById("form_login").addEventListener("submit", function (evento) {
    evento.preventDefault();
    entrar();
});

document.getElementById("btn_mostrar_senha").addEventListener("click", function () {
    var campo = document.getElementById("senha_input");
    if (campo.type == "password") {
        campo.type = "text";
        this.innerHTML = "Ocultar";
    } else {
        campo.type = "password";
        this.innerHTML = "Mostrar";
    }
}); 