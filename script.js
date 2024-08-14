const html = document.querySelector("html")
const botaoFoco = document.querySelector(".app__card-button--foco")
const botaoFocoCurto = document.querySelector(".app__card-button--curto")
const botaoFocoLongo = document.querySelector(".app__card-button--longo")
const botaoMusica = document.querySelector(".app__card-primary-button")
const textoPrincipal = document.querySelector(".app__title")
const todosBotoes = document.querySelectorAll(".app__card-button")
const playEPauseImage = document.querySelector(".app__card-primary-butto-icon")
const botaoComecar = document.querySelector("#start-pause")
const botaoComecarEPausar = document.querySelector("#start-pause span")
const musicaFocoUInput = document.querySelector("#alternar-musica")
const temporizador = document.querySelector("#timer")
const musicaConcentracao = new Audio("/sons/luna-rise-part-one.mp3")
const audioIniciarTemporizador = new Audio("/sons/play.wav")
const audioPauseTemporizador = new Audio("/sons/pause.mp3")
const audioTemporizadorFinalizado = new Audio("/sons/beep.mp3")

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicaConcentracao.loop = true

const banner = document.querySelector(".app__image")

botaoFoco.addEventListener("click", (e) => {
    alterarContexto('foco')
    botaoFoco.classList.add("active")
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
})

botaoFocoCurto.addEventListener("click", (e) => {
    alterarContexto("descanso-curto")
    botaoFocoCurto.classList.add("active")
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
})

botaoFocoLongo.addEventListener("click", (e) => {
    alterarContexto("descanso-longo")
    botaoFocoLongo.classList.add("active")
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
})

musicaFocoUInput.addEventListener("change", () => {
    if(musicaConcentracao.paused) {
        musicaConcentracao.play()
    } else {
        musicaConcentracao.pause()
    }
})

function alterarContexto(contexto){
    todosBotoes.forEach((contexto) => {
        contexto.classList.remove("active")
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", '/imagens/' + contexto +'.png')
    switch(contexto) {
        case "foco":
            textoPrincipal.innerHTML = `
                 Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;
        case "descanso-curto":
            textoPrincipal.innerHTML = `
                Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
        break;
        case "descanso-longo":
            textoPrincipal.innerHTML = `
            Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        //audioTemporizadorFinalizado.play()
        alert("Tempo Finalizado")
        zerarContagem()
        tempoDecorridoEmSegundos = 5
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

function iniciarPausarContagem() {
    if(intervaloId) {
        audioPauseTemporizador.play()
        zerarContagem()
        return
    }
    audioIniciarTemporizador.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    botaoComecarEPausar.textContent = "Pausar"
    playEPauseImage.setAttribute("src", "/imagens/pause.png")
}

function zerarContagem() {
    clearInterval(intervaloId)
    botaoComecarEPausar.textContent = "Começar"
    playEPauseImage.setAttribute("src", "/imagens/play_arrow.png")
    intervaloId = null
}

botaoComecar.addEventListener("click", iniciarPausarContagem)

function mostrarTempo() {
    const tempoContexto = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempoContexto.toLocaleString("pt-br", {minute: "2-digit", second: "2-digit" })
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo()