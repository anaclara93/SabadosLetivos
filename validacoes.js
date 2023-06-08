const inputs = document.querySelectorAll("[required]");
console.log(inputs);
inputs.forEach((elemento) => {
    //console.log(elemento);
    elemento.addEventListener("blur", (evento) => {
        // console.log(evento.target.name);
        // console.log(evento.target.maxlength); //aqui ele vai verificar se o usu add o numero max ou min exigido.

        validaCampo(evento.target)
    });
});

function validaCampo(campo) {
    const msgErro = campo.parentNode.querySelector("[data-erro]");
    if (campo.name === "nome") {
        if (campo.value.length < 3) {
            msgErro.textContent = "insira um nome válido";
        } else {
            msgErro.textContent = ""
        }
    }
    if (campo.name === "email") {
        if (campo.value.length < 5) {
            msgErro.textContent = "Email inválido."
        } else {
            msgErro.textContent = ""
        }
    }
    if (campo.name === "celular") {
        if (campo.value.length < 10) {
            msgErro.textContent = "Número inválido."
        } else {
            msgErro.textContent = ""
        }
    }
    if (campo.name === "cpf") {
        if (campo.value.length < 1) {
            // msgErro.textContent="Digite apenas números!" -- quero por o cód verificas se são apenas numeros.
            msgErro.textContent = "CPF inválido"
        } else {
            msgErro.textContent = ""
        }
    }
}


function validaCPF(cpf) {
    //verição dos campos iguais...

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    //validar digitos....
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var digito1 = resto > 9 ? 0 : resto;// se o resto for maior que 9 o digito é 0

    if (parseInt(cpf.charAt(9)) !== digito1) {
        return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++)//criando loop de verificação
    {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    var digito2 = resto > 9 ? 0 : resto;
    if (parseInt(cpf.charAt(10)) !== digito2) {
        return false;
    }

    return true;
}

function validarcelular(telefone) {
    telefone = telefone.replace(/[^\d]+/g, '');

    if (telefone.length !== 10 && telefone.length !== 11) {
        return false;
    }
    // for (var i = 0; i < telefone.length - 1; i++) {
    //     if (telefone.charAt(i) === telefone.charAt(i + 1)) {
    //         true
    //     }
    // }
    if (!/^\(?\d{2}\)?[\s-]?\d{4}-?\d{4}$/.test(telefone)){
        return true;
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const cpf = document.getElementById('cpf').value;

    if (nome.trim() === '' || email.trim() === '' || celular.trim() === '' || cpf.trim() === '') {
        alert('Preencha corretamente todos os campos.');
    } else if (!validaCPF(cpf)) {
        alert('CPF inválido.');
    } else if (!validarcelular(celular)) {
        alert('Numero de telefone inválido.');
    } else {
        alert('Enviado com sucesso!');
    }
});