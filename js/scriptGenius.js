let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

// Acesso ao DOM
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const play = document.querySelector('.play');
const pontos = document.querySelector('#pontos');
const resultado = document.querySelector('.main-game')

// Eventos de Clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
play.onclick = () => playGame();

// Criar Ordem Aleatoria das Cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a Próxima Cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 400);
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
}

// Checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            green.classList.add('errado');
            green.classList.remove('selected');
            red.classList.add('errado');
            red.classList.remove('selected');
            yellow.classList.add('errado');
            yellow.classList.remove('selected');
            blue.classList.add('errado');
            blue.classList.remove('selected');
            resultado.dataset.content = 'ERROU !!';
            setTimeout(() => {
                green.classList.remove('errado');
                green.classList.add('selected');
                red.classList.remove('errado');
                red.classList.add('selected');
                yellow.classList.remove('errado');
                yellow.classList.add('selected');
                blue.classList.remove('errado');
                blue.classList.add('selected');
                resultado.dataset.content = '';
                gameOver();
            }, 550);
            break;
        }
        if(clickedOrder.length == order.length) {
            green.classList.add('certo');
            green.classList.remove('selected');
            red.classList.add('certo');
            red.classList.remove('selected');
            yellow.classList.add('certo');
            yellow.classList.remove('selected');
            blue.classList.add('certo');
            blue.classList.remove('selected');
            resultado.dataset.content = 'ACERTOU !!';
            setTimeout(() => {
                green.classList.remove('certo');
                green.classList.add('selected');
                red.classList.remove('certo');
                red.classList.add('selected');
                yellow.classList.remove('certo');
                yellow.classList.add('selected');
                blue.classList.remove('certo');
                blue.classList.add('selected');
                resultado.dataset.content = '';
                nextLevel();
            }, 550);
            break;
        }
    }
}

// Função para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.remove('selected');

    setTimeout(() => {
        createColorElement(color).classList.add('selected');
        checkOrder();
    }, 250);
}

// Função para Retornar a Cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Função para Próximo nivel do jogo
let nextLevel = () => {
    score++;
    pontos.innerHTML = score;
    shuffleOrder();
}

// Função Game-Over
let gameOver = () => {
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!`);
    order = [];
    clickedOrder = [];
    score = 0;
    pontos.innerHTML = score;
}

// Função para Iniciar o Jogo
let playGame = () => {
    score = 0;
    shuffleOrder();
}