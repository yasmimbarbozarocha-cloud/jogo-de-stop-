// Banco de palavras por letra (aumentando o desafio ortográfico aos poucos)
const BANCO_PALAVRAS = {
  A: {
    nome: ["Ana", "Alice", "Arthur", "Artur", "Amanda", "André", "Antônio", "Aline", "Alexandre", "Augusto"],
    fruta: ["Abacaxi", "Abacate", "Amora", "Acerola", "Ameixa", "Açaí"],
    cor: ["Azul", "Amarelo", "Amarela", "Alaranjado", "Anil"],
    objeto: ["Apontador", "Anel", "Almofada", "Agulha", "Armário", "Apito", "Álbum", "Abajur"]
  },
  B: {
    nome: ["Beatriz", "Bruno", "Bianca", "Bernardo", "Bárbara", "Breno", "Benício", "Betina"],
    fruta: ["Banana", "Bergamota", "Buriti", "Bacuri"],
    cor: ["Branco", "Branca", "Bege", "Bordô", "Bronze"],
    objeto: ["Borracha", "Bola", "Bolsa", "Bicicleta", "Balde", "Boné", "Bússola", "Banco"]
  },
  C: {
    nome: ["Carlos", "Camila", "Caio", "Clara", "Cecília", "César", "Cíntia", "Cauã", "Carolina"],
    fruta: ["Caju", "Carambola", "Cereja", "Coco", "Caqui", "Cupuaçu", "Cidra"],
    cor: ["Cinza", "Caramelo", "Castanho", "Ciano", "Coral", "Creme"],
    objeto: ["Caderno", "Caneta", "Cadeira", "Copo", "Colher", "Chave", "Celular", "Cama", "Caixa"]
  },
  M: {
    nome: ["Maria", "Mateus", "Matheus", "Mariana", "Miguel", "Marcos", "Melissa", "Marcelo", "Mônica"],
    fruta: ["Maçã", "Manga", "Melancia", "Melão", "Morango", "Maracujá", "Mamão", "Mexerica"],
    cor: ["Marrom", "Magenta", "Mostarda", "Marfim"],
    objeto: ["Mesa", "Mochila", "Martelo", "Mapa", "Microfone", "Moeda", "Máscara", "Mala"]
  },
  P: {
    nome: ["Pedro", "Paula", "Paulo", "Patrícia", "Pietro", "Priscila", "Pamela", "Pâmela"],
    fruta: ["Pera", "Pêssego", "Pitanga", "Pinha", "Pitaia", "Pequi"],
    cor: ["Preto", "Preta", "Prata", "Púrpura", "Pink"],
    objeto: ["Prato", "Panela", "Pente", "Porta", "Pincel", "Parafuso", "Pulseira", "Papel"]
  },
  S: {
    nome: ["Sofia", "Sophia", "Samuel", "Sara", "Sarah", "Sérgio", "Simone", "Sabrina", "Sônia"],
    fruta: ["Seriguela", "Sapoti", "Salak"],
    cor: ["Salmão", "Sépia"],
    objeto: ["Sapato", "Sofá", "Sacola", "Sino", "Sabonete", "Serrote", "Secador", "Selo"]
  },
  G: {
    nome: ["Gabriel", "Gabriela", "Gustavo", "Giovanna", "Giovana", "Guilherme", "Gisele"],
    fruta: ["Goiaba", "Graviola", "Groselha", "Guaraná"],
    cor: ["Grafite", "Gelo", "Grená"],
    objeto: ["Garfo", "Garrafa", "Gaveta", "Gaiola", "Guitarra", "Guardanapo", "Grampeador"]
  },
  L: {
    nome: ["Lucas", "Laura", "Luiza", "Luísa", "Leonardo", "Larissa", "Lorena", "Lívia", "Rafael"],
    fruta: ["Laranja", "Limão", "Lichia", "Lima"],
    cor: ["Lilás", "Laranja"],
    objeto: ["Lápis", "Livro", "Lanterna", "Lixeira", "Lousa", "Luminária", "Luva", "Leque"]
  }
};

// Dicas educativas de ortografia para palavras muito erradas na escola
const DICAS_ORTOGRAFIA = {
  "maca": "Atenção aos sinais gráficos: 'Maçã' precisa de cedilha (ç) e til (~).",
  "melao": "Faltou o til (~): o correto é 'Melão'.",
  "limao": "Faltou o til (~): o correto é 'Limão'.",
  "mamao": "Faltou o til (~): o correto é 'Mamão'.",
  "lapis": "Palavras paroxítonas terminadas em 'is' levam acento: 'Lápis'.",
  "armario": "Faltou o acento agudo no 'a': 'Armário'.",
  "mascara": "Todas as proparoxítonas são acentuadas: 'Máscara'.",
  "pessego": "Todas as proparoxítonas são acentuadas: 'Pêssego'.",
  "lilas": "Oxítona terminada em 'a' seguida de 's' leva acento: 'Lilás'.",
  "sofa": "Oxítona terminada em 'a' leva acento agudo: 'Sofá'.",
  "bone": "Oxítona terminada em 'e' leva acento agudo: 'Boné'.",
  "acai": "O 'i' tônico em hiato recebe acento e 'c' leva cedilha: 'Açaí'.",
  "maracuja": "Oxítona terminada em 'a' leva acento agudo: 'Maracujá'.",
  "guarana": "Oxítona terminada em 'a' leva acento agudo: 'Guaraná'.",
  "boracha": "O som forte do 'r' entre vogais exige dígrafo 'rr': 'Borracha'.",
  "garafa": "O som forte do 'r' entre vogais exige dígrafo 'rr': 'Garrafa'.",
  "guitarra": "Lembre-se do dígrafo 'gu' e do 'rr': 'Guitarra'."
};

// Configuração das rodadas (do mais fácil para letras que exigem mais acentuação)
const SEQUENCIA_LETRAS = ["B", "C", "P", "M", "L", "S"];
const TOTAL_RODADAS = 6;
const TEMPO_POR_RODADA = 40;
const PONTOS_ACERTO = 2;
const PENALIDADE_ERRO = 1;

// Estado do jogo
let rodadaAtual = 0;
let pontos = 0;
let tempoRestante = TEMPO_POR_RODADA;
let temporizador = null;
let inicioJogoMs = 0;
let jogoEmAndamento = false;

// Elementos da tela
const painelStatus = document.getElementById("painel-status");
const textoRodada = document.getElementById("texto-rodada");
const letraAtualEl = document.getElementById("letra-atual");
const textoTempo = document.getElementById("texto-tempo");
const textoPontos = document.getElementById("texto-pontos");

const telaInicio = document.getElementById("tela-inicio");
const telaJogo = document.getElementById("tela-jogo");
const telaCorrecao = document.getElementById("tela-correcao");
const telaFinal = document.getElementById("tela-final");

const formularioStop = document.getElementById("formulario-stop");
const campoNome = document.getElementById("campo-nome");
const campoFruta = document.getElementById("campo-fruta");
const campoCor = document.getElementById("campo-cor");
const campoObjeto = document.getElementById("campo-objeto");

const tituloCorrecao = document.getElementById("titulo-correcao");
const listaFeedback = document.getElementById("lista-feedback");
const botaoProxima = document.getElementById("botao-proxima");

// Funções auxiliares para texto e acentuação
function removerAcentos(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function formatarPrimeiraMaiuscula(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Notifica o portal sobre a altura da página
function avisarAlturaPortal() {
  const altura = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "vrgame:resize", height: altura }, "*");
}

// Alternar telas
function mostrarTela(telaParaMostrar) {
  [telaInicio, telaJogo, telaCorrecao, telaFinal].forEach((tela) => {
    tela.classList.add("oculto");
  });
  telaParaMostrar.classList.remove("oculto");
  avisarAlturaPortal();
}

// Inicia o jogo do zero
function iniciarJogo() {
  rodadaAtual = 0;
  pontos = 0;
  inicioJogoMs = Date.now();
  painelStatus.classList.remove("oculto");
  atualizarPlacar();
  iniciarRodada();
}

// Prepara uma nova letra
function iniciarRodada() {
  jogoEmAndamento = true;
  const letra = SEQUENCIA_LETRAS[rodadaAtual];
  tempoRestante = TEMPO_POR_RODADA;

  textoRodada.textContent = `${rodadaAtual + 1} / ${TOTAL_RODADAS}`;
  letraAtualEl.textContent = letra;
  textoTempo.textContent = `${tempoRestante}s`;
  atualizarPlacar();

  // Limpa campos
  campoNome.value = "";
  campoFruta.value = "";
  campoCor.value = "";
  campoObjeto.value = "";

  mostrarTela(telaJogo);
  campoNome.focus();

  clearInterval(temporizador);
  temporizador = setInterval(() => {
    tempoRestante--;
    textoTempo.textContent = `${tempoRestante}s`;
    if (tempoRestante <= 0) {
      finalizarRodada(true);
    }
  }, 1000);
}

// Avalia uma única palavra digitada pelo aluno
function avaliarResposta(categoria, valorDigitado, letra) {
  const respostaLimpa = valorDigitado.trim();
  const nomesCategorias = {
    nome: "Nome",
    fruta: "Fruta",
    cor: "Cor",
    objeto: "Objeto"
  };
  const rotulo = nomesCategorias[categoria];

  // 1. Deixou em branco
  if (!respostaLimpa) {
    return {
      acertou: false,
      titulo: `${rotulo}: (em branco) — (-1 ponto)`,
      explicacao: `Você não preencheu esta categoria. Exemplo válido: ${BANCO_PALAVRAS[letra][categoria][0]}.`
    };
  }

  // 2. Começou com a letra errada
  const primeiraLetraSemAcento = removerAcentos(respostaLimpa.charAt(0)).toUpperCase();
  if (primeiraLetraSemAcento !== letra) {
    return {
      acertou: false,
      titulo: `${rotulo}: "${respostaLimpa}" — (-1 ponto)`,
      explicacao: `A palavra precisa começar com a letra "${letra}", mas começou com "${respostaLimpa.charAt(0).toUpperCase()}".`
    };
  }

  const listaValida = BANCO_PALAVRAS[letra][categoria];
  const respostaMinuscula = respostaLimpa.toLowerCase();
  const respostaSemAcento = removerAcentos(respostaLimpa);

  // 3. Verifica se escreveu exatamente igual (com acentos e letras certas)
  const acertoExato = listaValida.find(
    (palavra) => palavra.toLowerCase() === respostaMinuscula
  );

  if (acertoExato) {
    return {
      acertou: true,
      titulo: `${rotulo}: "${acertoExato}" — (+${PONTOS_ACERTO} pontos)`,
      explicacao: `Ortografia perfeita! A palavra começa com "${letra}" e está escrita corretamente.`
    };
  }

  // 4. Verifica se acertou a palavra, mas errou o acento ou cedilha
  const acertoSemAcento = listaValida.find(
    (palavra) => removerAcentos(palavra) === respostaSemAcento
  );

  if (acertoSemAcento) {
    const dicaExtra = DICAS_ORTOGRAFIA[respostaSemAcento] ||
      `Faltou atenção na acentuação ou cedilha: o correto é "${acertoSemAcento}".`;
    return {
      acertou: false,
      titulo: `${rotulo}: "${respostaLimpa}" — (-1 ponto)`,
      explicacao: dicaExtra
    };
  }

  // 5. Dica específica de ortografia (como troca de R/RR) ou palavra fora da lista escolar
  if (DICAS_ORTOGRAFIA[respostaSemAcento]) {
    return {
      acertou: false,
      titulo: `${rotulo}: "${respostaLimpa}" — (-1 ponto)`,
      explicacao: DICAS_ORTOGRAFIA[respostaSemAcento]
    };
  }

  return {
    acertou: false,
    titulo: `${rotulo}: "${respostaLimpa}" — (-1 ponto)`,
    explicacao: `Não reconhecemos essa palavra como ${rotulo.toLowerCase()} ou há erro de grafia. Exemplos válidos: ${listaValida.slice(0, 3).join(", ")}.`
  };
}

// Para o relógio e corrige as 4 respostas
function finalizarRodada(acabouTempo = false) {
  if (!jogoEmAndamento) return;
  jogoEmAndamento = false;
  clearInterval(temporizador);

  const letra = SEQUENCIA_LETRAS[rodadaAtual];
  const respostas = [
    avaliarResposta("nome", campoNome.value, letra),
    avaliarResposta("fruta", campoFruta.value, letra),
    avaliarResposta("cor", campoCor.value, letra),
    avaliarResposta("objeto", campoObjeto.value, letra)
  ];

  listaFeedback.innerHTML = "";
  let saldoRodada = 0;

  respostas.forEach((resultado) => {
    if (resultado.acertou) {
      saldoRodada += PONTOS_ACERTO;
    } else {
      saldoRodada -= PENALIDADE_ERRO;
    }

    const item = document.createElement("div");
    item.className = `item-feedback ${resultado.acertou ? "acerto" : "erro"}`;
    item.innerHTML = `<strong>${resultado.titulo}</strong><span>${resultado.explicacao}</span>`;
    listaFeedback.appendChild(item);
  });

  // Atualiza pontuação (não deixa ficar menor que zero no placar geral)
  pontos = Math.max(0, pontos + saldoRodada);
  atualizarPlacar();

  tituloCorrecao.textContent = acabouTempo
    ? `Tempo esgotado! Correção da letra "${letra}"`
    : `STOP! Correção da letra "${letra}"`;

  botaoProxima.textContent =
    rodadaAtual + 1 < TOTAL_RODADAS ? "Próxima Letra" : "Ver Resultado Final";

  mostrarTela(telaCorrecao);
}

function atualizarPlacar() {
  textoPontos.textContent = pontos;
}

// Avança para a próxima rodada ou encerra o jogo
function avancarRodada() {
  rodadaAtual++;
  if (rodadaAtual < TOTAL_RODADAS) {
    iniciarRodada();
  } else {
    encerrarJogo();
  }
}

// Mostra tela final e avisa o portal
function encerrarJogo() {
  painelStatus.classList.add("oculto");
  const tempoTotalMs = Date.now() - inicioJogoMs;
  const segundosTotais = Math.round(tempoTotalMs / 1000);
  const pontuacaoMaxima = TOTAL_RODADAS * 4 * PONTOS_ACERTO;

  document.getElementById("pontuacao-final").textContent = `${pontos} / ${pontuacaoMaxima}`;
  document.getElementById("tempo-final").textContent = `${segundosTotais}s`;

  const mensagemEl = document.getElementById("mensagem-final");
  if (pontos >= 36) {
    mensagemEl.textContent = "Excelente! Sua ortografia e seu vocabulário estão afiadíssimos!";
  } else if (pontos >= 20) {
    mensagemEl.textContent = "Muito bem! Você mandou bem nas letras e treinou bastante a escrita.";
  } else {
    mensagemEl.textContent = "Bom treino! Que tal jogar de novo prestando atenção nos acentos e nas letras?";
  }

  mostrarTela(telaFinal);

  // Contrato com o portal
  window.parent.postMessage(
    {
      type: "vrgame:finish",
      score: pontos,
      maxScore: pontuacaoMaxima,
      timeMs: tempoTotalMs,
      detail: { jogo: "desafio-do-stop" }
    },
    "*"
  );
}

// Alternância de tema claro/escuro
function aplicarTema(tema) {
  if (tema === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  avisarAlturaPortal();
}

document.getElementById("botao-tema").addEventListener("click", () => {
  const escuroAtivo = document.documentElement.getAttribute("data-theme") === "dark";
  aplicarTema(escuroAtivo ? "light" : "dark");
});

// Eventos dos botões e formulário
document.getElementById("botao-comecar").addEventListener("click", iniciarJogo);

formularioStop.addEventListener("submit", (evento) => {
  evento.preventDefault();
  finalizarRodada(false);
});

botaoProxima.addEventListener("click", avancarRodada);
document.getElementById("botao-reiniciar").addEventListener("click", iniciarJogo);

// Escuta mensagens enviadas pelo portal (tema e tela cheia)
window.addEventListener("message", (evento) => {
  const dados = evento.data;
  if (!dados || typeof dados !== "object") return;

  if (dados.type === "vrgame:theme") {
    aplicarTema(dados.theme === "dark" ? "dark" : "light");
  }

  if (dados.type === "vrgame:fullscreen") {
    if (dados.fullscreen && !document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!dados.fullscreen && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    avisarAlturaPortal();
  }
});

// Avisa mudança de tamanho de tela e inicialização
window.addEventListener("resize", avisarAlturaPortal);
window.addEventListener("DOMContentLoaded", () => {
  avisarAlturaPortal();
  window.parent.postMessage({ type: "vrgame:ready" }, "*");
});