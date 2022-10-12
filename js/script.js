const valoranterior = document.querySelector("#p-op");
const valoratual = document.querySelector("#c-op");
const butaozinhosop = document.querySelectorAll("#butaozinhos button");

class Calculadora {
  constructor(valoranterior, valoratual) {
    this.valoranterior = valoranterior;
    this.valoratual = valoratual;
    this.operacaoatual = "";
  }

  // adiciona o numero na tela
  adcnumero(digito) {
    console.log(digito);
    // Verifique se o número já tem um ponto (ain o quebradinhuu)
    if (digito === "." && this.valoratual.innerText.includes(".")) {
      return;
    }

    this.operacaoatual = digito;
    this.atualizar();//atualiza a tela
  }

  // Aqui é onde a magia acontece, ou melhor dizendo, os calculos
  operacao(operador) {
    // Verificar se ta vazio
    if (this.valoratual.innerText === "" && operador !== "C") {
      // Seleciona a operação
      if (this.valoranterior.innerText !== "") {
        this.selecoperacao(operador);
      }
      return;
    }

    // Pega o valor atual e o antigo (pra não encerrar a operação quando eu apertar no igual)
    //q nem na minha antiga e triste calculadorazinha em java... mas são águas passadas hehehe
    //aliás, a que eu fiz em java, usa o msm método, mas tem q digitoar no prompt, enfim, evolução
    let tpoperacao;
    let anterior = +this.valoranterior.innerText.split(" ")[0];
    let atual = +this.valoratual.innerText;

    switch (operador) {
      case "+":
        tpoperacao = anterior + atual;
        this.atualizar(tpoperacao, operador, atual, anterior);
        break;
      case "-":
        tpoperacao = anterior - atual;
        this.atualizar(tpoperacao, operador, atual, anterior);
        break;
      case "x":
        tpoperacao = anterior * atual;
        this.atualizar(tpoperacao, operador, atual, anterior);
        break;
      case "÷":
        tpoperacao = anterior / atual;
        this.atualizar(tpoperacao, operador, atual, anterior);
        break;
       case "%":
        tpoperacao = (atual * 100) / anterior;
        this.atualizar(tpoperacao, operador, atual, anterior);
        break;
      case "`":
        this.deleta();
        break;
      case "CE":
        this.apagaL();
        break;
      case "C":
        this.apagaT();
        break;
      case "=":
        this.operador();
        break;
      default:
        return;
    }
  }

  // Muda os valores que estão na tela (apaga td)
  atualizar(
    tpoperacao = null,
    operador = null,
    atual = null,
    anterior = null
  ) {
    if (tpoperacao === null) {
      // Adiciona o primeiro numero
      this.valoratual.innerText += this.operacaoatual;
    } else {
      // Verifica se é zero, se for, ele só continua na msm porcaria, é isso
      if (anterior === 0) {
        tpoperacao = atual;
      }
      // Pega o resultado, ou o numero que estava na tela, antes de vc digitoar (igual no layoutzin da calc do windows)
      this.valoranterior.innerText = `${tpoperacao} ${operador}`;
      this.valoratual.innerText = "";
    }
  }

  // Aqui é onde vc seleciona a operação
  selecoperacao(operador) {
    const operadores = ["x", "-", "+", "÷", "%"];

    if (!operadores.includes(operador)) {
      return;
    }

    this.valoranterior.innerText =
      this.valoranterior.innerText.slice(0, -1) + operador;
  }

  // Apaga o numeroziinhoooooo
  deleta() {
    this.valoratual.innerText =
      this.valoratual.innerText.slice(0, -1);
  }

  // Apaga oque voce ta fazendo no momento (linha de baixo)
  apagaL() {
    this.valoratual.innerText = "";
  }

  // Aqui é onde zera tudo (aquela hora que voce abandona td e vai pro brainly)
  apagaT() {
    this.valoratual.innerText = "";
    this.valoranterior.innerText = "";
  }

  // É o gatilho pra operação acontecer
  operador() {
    let operador = this.valoranterior.innerText.split(" ")[1];

    this.operacao(operador);
  }
}

const calc = new Calculadora(valoranterior, valoratual);

butaozinhosop.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.adcnumero(value);
    } else {
      calc.operacao(value);
    }
  });
});