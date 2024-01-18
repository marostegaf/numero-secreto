let listaDeNumerosSorteados = []
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2})
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Número Secreto")
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10")
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector("input").value

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1" , "Acertou!")
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentiva"

        let mensagemTentativas = `Você descobriu o número secreto com`  +
        ` ${tentativas} ${palavraTentativa}!`

        exibirTextoNaTela("p" , mensagemTentativas)

        //Novo jogo
        document.getElementById("reiniciar").removeAttribute("disabled")

    } else {    
        exibirTextoNaTela("h1", "Errou!")
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor que o chute!")

        } else {
            exibirTextoNaTela("p", "O número secreto é maior que o chute!")

        }
        limparCampo()
        tentativas++
    }
}

function gerarNumeroAleatorio() {
    console.log(`Números sorteados até o momento: ${listaDeNumerosSorteados}`)
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //Verificar se o elemento está na lista
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido
    }
}

function limparCampo() {
    chute = document.querySelector("input")
    chute.value = ""
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    exibirMensagemInicial()
    document.getElementById("reiniciar").setAttribute("disabled", true)
}
