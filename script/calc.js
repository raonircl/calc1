'use strict';

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const op = document.querySelectorAll("[id*=op]");

let novoNum = true;
let operador;
let numAnterior;

const opPendente = () => operador !== undefined;

const calcular = () => {
    if (opPendente()) {
        const numAtual = parseFloat(display.textContent.replace(",", "."));
        novoNum = true;
        const resultado = eval(`${numAnterior}${operador}${numAtual}`);
        atualizarDisplay(resultado)
    }
}

const atualizarDisplay = (texto) => {
    if (novoNum) {
        display.textContent = texto.toLocaleString("BR");
        novoNum = false;
    } else {
        display.textContent += texto;
    }
}

const inserirNum = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener("click", inserirNum));

const selecionarOp = (evento) => {
    if (!novoNum) {
        calcular();
        novoNum = true;
        operador = evento.target.textContent;
        numAnterior = parseFloat(display.textContent.replace(",", "."));
    }
}
op.forEach(operador => operador.addEventListener("click", selecionarOp));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById("igual").addEventListener("click", ativarIgual);

const limparDisplay = () => display.textContent = "";
document.getElementById("limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNum = true;
    numAnterior = undefined;
}
document.getElementById("limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNum = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById("backspace").addEventListener("click", removerUltimoNum);

const inverterSinal = () => {
    novoNum = true;
    atualizarDisplay(display.textContent * - 1);
}
document.getElementById("inverter").addEventListener("click", inverterSinal);

const existeDecimal = () => display.textContent.indexOf(",") != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(",");
        }
        else {
            atualizarDisplay("0,");
        }
    }
}
document.getElementById("decimal").addEventListener("click", inserirDecimal);

const mapaTeclado = {

    "0": "tecla0",
    "1": "tecla1",
    "2": "tecla2",
    "3": "tecla3",
    "4": "tecla4",
    "5": "tecla5",
    "6": "tecla6",
    "7": "tecla7",
    "8": "tecla8",
    "9": "tecla9",
    "C": "limparDisplay",
    "Escape": "limparCalculo",
    "Enter": "igual",
    "=": "igual",
    "Backspace": "backspace",
    ",": "decimal",
    "/": "opDividir",
    "*": "opMultiplicador",
    "+": "opAdicionar",
    "-": "opSub",

}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    console.log(mapearTeclado);

    const teclaP = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if (teclaP()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener("keydown", mapearTeclado);