import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tela, setTela] = useState('inicio')
  const [telaTreino, setTelaTreino] = useState(false)

  const [nome, setNome] = useState(
    localStorage.getItem('nome') || 'Aluno'
  )

  const [idade, setIdade] = useState(
    localStorage.getItem('idade') || ''
  )

  const [peso, setPeso] = useState(
    localStorage.getItem('peso') || ''
  )

  const [xp, setXp] = useState(
    Number(localStorage.getItem('xp')) || 0
  )

  const [historico, setHistorico] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('historico') || '[]'
      )
    } catch {
      return []
    }
  })

  const [agua, setAgua] = useState(
    Number(localStorage.getItem('agua')) || 0
  )

  const [escuro, setEscuro] = useState(
    localStorage.getItem('escuro') === 'true'
  )

  const [tempo, setTempo] = useState(15)
  const [rodando, setRodando] = useState(false)

  const semanaMeta =
    Number(localStorage.getItem('semanaMeta')) || 5

  const [seriesConcluidas, setSeriesConcluidas] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            'seriesConcluidas'
          ) || '{}'
        )
      } catch {
        return {}
      }
    })

  const [refeicoes, setRefeicoes] = useState(() => {
    try {
      const salvas =
        localStorage.getItem('refeicoes')

      if (salvas) {
        return JSON.parse(salvas)
      }
    } catch {
      // usa padrão
    }

    return [
      {
        nome: 'Café da manhã',
        horario: '08:00',
        feita: false
      },
      {
        nome: 'Almoço',
        horario: '12:00',
        feita: false
      },
      {
        nome: 'Lanche',
        horario: '16:00',
        feita: false
      },
      {
        nome: 'Jantar',
        horario: '19:30',
        feita: false
      }
    ]
  })

  // =========================================
  // TREINOS DA SEMANA
  // =========================================

  const treinos = {
    segunda: {
      dia: 1,
      nomeDia: 'Segunda',
      grupo: 'Peito + Tríceps',
      icone: '🟥',

      treino: {
        id: 'peito-a',
        nome: 'Peito A',

        exercicios: [
          {
            nome: 'Supino reto',
            series: 4,
            repeticoes: 10
          },
          {
            nome: 'Supino inclinado',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Crucifixo',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Tríceps pulley',
            series: 3,
            repeticoes: 12
          }
        ]
      }
    },

    terca: {
      dia: 2,
      nomeDia: 'Terça',
      grupo: 'Costas + Bíceps',
      icone: '🟦',

      treino: {
        id: 'costas-a',
        nome: 'Costas A',

        exercicios: [
          {
            nome: 'Puxada frontal',
            series: 4,
            repeticoes: 10
          },
          {
            nome: 'Remada baixa',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Remada curvada',
            series: 3,
            repeticoes: 10
          },
          {
            nome: 'Rosca direta',
            series: 3,
            repeticoes: 10
          }
        ]
      }
    },

    quarta: {
      dia: 3,
      nomeDia: 'Quarta',
      grupo: 'Pernas',
      icone: '🟩',

      treino: {
        id: 'pernas-a',
        nome: 'Pernas A',

        exercicios: [
          {
            nome: 'Agachamento',
            series: 4,
            repeticoes: 10
          },
          {
            nome: 'Leg press',
            series: 4,
            repeticoes: 12
          },
          {
            nome: 'Cadeira extensora',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Panturrilha',
            series: 4,
            repeticoes: 15
          }
        ]
      }
    },

    quinta: {
      dia: 4,
      nomeDia: 'Quinta',
      grupo: 'Peito + Tríceps',
      icone: '🟥',

      treino: {
        id: 'peito-b',
        nome: 'Peito B',

        exercicios: [
          {
            nome: 'Supino com halteres',
            series: 4,
            repeticoes: 10
          },
          {
            nome: 'Peck deck',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Crossover',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Tríceps francês',
            series: 3,
            repeticoes: 10
          }
        ]
      }
    },

    sexta: {
      dia: 5,
      nomeDia: 'Sexta',
      grupo: 'Costas + Bíceps',
      icone: '🟦',

      treino: {
        id: 'costas-b',
        nome: 'Costas B',

        exercicios: [
          {
            nome: 'Puxada aberta',
            series: 4,
            repeticoes: 10
          },
          {
            nome: 'Remada unilateral',
            series: 3,
            repeticoes: 10
          },
          {
            nome: 'Pullover',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Rosca martelo',
            series: 3,
            repeticoes: 10
          }
        ]
      }
    },

    sabado: {
      dia: 6,
      nomeDia: 'Sábado',
      grupo: 'Pernas',
      icone: '🟩',

      treino: {
        id: 'pernas-b',
        nome: 'Pernas B',

        exercicios: [
          {
            nome: 'Stiff',
            series: 3,
            repeticoes: 10
          },
          {
            nome: 'Mesa flexora',
            series: 4,
            repeticoes: 12
          },
          {
            nome: 'Cadeira flexora',
            series: 3,
            repeticoes: 12
          },
          {
            nome: 'Panturrilha sentado',
            series: 4,
            repeticoes: 15
          }
        ]
      }
    }
  }

  // =========================================
  // DATA E DIA ATUAL
  // =========================================

  const hoje = new Date()
    .toISOString()
    .split('T')[0]

  const diaAtual = new Date().getDay()

  const nomesDias = {
    1: 'segunda',
    2: 'terca',
    3: 'quarta',
    4: 'quinta',
    5: 'sexta',
    6: 'sabado'
  }

  const treinoDeHoje =
    nomesDias[diaAtual] || null

  const treinoHoje =
    treinoDeHoje
      ? treinos[treinoDeHoje]
      : null

  const treinoAberto =
    treinoHoje
      ? treinoHoje.treino
      : null

  // =========================================
  // SALVAMENTO
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      'nome',
      nome
    )
  }, [nome])

  useEffect(() => {
    localStorage.setItem(
      'idade',
      idade
    )
  }, [idade])

  useEffect(() => {
    localStorage.setItem(
      'peso',
      peso
    )
  }, [peso])

  useEffect(() => {
    localStorage.setItem(
      'xp',
      xp
    )
  }, [xp])

  useEffect(() => {
    localStorage.setItem(
      'historico',
      JSON.stringify(historico)
    )
  }, [historico])

  useEffect(() => {
    localStorage.setItem(
      'agua',
      agua
    )
  }, [agua])

  useEffect(() => {
    localStorage.setItem(
      'escuro',
      escuro
    )
  }, [escuro])

  useEffect(() => {
    localStorage.setItem(
      'seriesConcluidas',
      JSON.stringify(seriesConcluidas)
    )
  }, [seriesConcluidas])

  useEffect(() => {
    localStorage.setItem(
      'refeicoes',
      JSON.stringify(refeicoes)
    )
  }, [refeicoes])

  // =========================================
  // CRONÔMETRO
  // =========================================

  useEffect(() => {
    if (!rodando) {
      return
    }

    if (tempo <= 0) {
      setRodando(false)
      return
    }

    const intervalo =
      setInterval(() => {
        setTempo(
          valor => valor - 1
        )
      }, 1000)

    return () => {
      clearInterval(intervalo)
    }
  }, [rodando, tempo])

  // =========================================
  // ABRIR TREINO
  // =========================================

  function abrirTreino() {
    if (!treinoHoje) {
      return
    }

    setTelaTreino(true)
    setTela('treinos')

    setTempo(15)
    setRodando(false)
  }

  // =========================================
  // FECHAR TREINO
  // =========================================

  function fecharTreino() {
    setTelaTreino(false)
    setRodando(false)
  }

  // =========================================
  // CHAVE DA SÉRIE
  // =========================================

  function pegarChaveSerie(
    exercicioIndice
  ) {
    if (!treinoAberto) {
      return ''
    }

    return (
      treinoAberto.id +
      '-exercicio-' +
      exercicioIndice +
      '-' +
      hoje
    )
  }

  // =========================================
  // QUANTIDADE DE SÉRIES
  // =========================================

  function quantidadeSeriesFeitas(
    exercicioIndice
  ) {
    const chave =
      pegarChaveSerie(
        exercicioIndice
      )

    const lista =
      seriesConcluidas[chave] || []

    let quantidade = 0

    for (
      let i = 0;
      i < lista.length;
      i++
    ) {
      if (lista[i] === true) {
        quantidade++
      }
    }

    return quantidade
  }

  // =========================================
  // MARCAR SÉRIE
  // =========================================

  function marcarSerie(
    exercicioIndice,
    serieIndice
  ) {
    const chave =
      pegarChaveSerie(
        exercicioIndice
      )

    if (!chave) {
      return
    }

    const listaAtual =
      seriesConcluidas[chave] || []

    const novaLista = [
      ...listaAtual
    ]

    novaLista[serieIndice] =
      !novaLista[serieIndice]

    setSeriesConcluidas(
      estado => ({
        ...estado,
        [chave]: novaLista
      })
    )
  }

  // =========================================
  // REINICIAR SÉRIES
  // =========================================

  function reiniciarSeries(
    exercicioIndice
  ) {
    if (!treinoAberto) {
      return
    }

    const exercicio =
      treinoAberto.exercicios[
        exercicioIndice
      ]

    const chave =
      pegarChaveSerie(
        exercicioIndice
      )

    const lista = []

    for (
      let i = 0;
      i < exercicio.series;
      i++
    ) {
      lista.push(false)
    }

    setSeriesConcluidas(
      estado => ({
        ...estado,
        [chave]: lista
      })
    )
  }

  // =========================================
  // PROGRESSO DO TREINO
  // =========================================

  let totalSeries = 0
  let seriesFeitas = 0

  if (treinoAberto) {
    for (
      let i = 0;
      i < treinoAberto.exercicios.length;
      i++
    ) {
      totalSeries +=
        treinoAberto
          .exercicios[i]
          .series

      seriesFeitas +=
        quantidadeSeriesFeitas(i)
    }
  }

  let porcentagemTreino = 0

  if (totalSeries > 0) {
    porcentagemTreino =
      Math.round(
        (
          seriesFeitas /
          totalSeries
        ) * 100
      )
  }

  const treinoCompleto =
    treinoAberto !== null &&
    totalSeries > 0 &&
    seriesFeitas >= totalSeries

  // =========================================
  // XP DO TREINO
  // =========================================

  const identificadorXP =
    hoje +
    '-' +
    (
      treinoAberto
        ? treinoAberto.id
        : ''
    )

  useEffect(() => {
    if (
      treinoCompleto &&
      treinoAberto &&
      !historico.includes(
        identificadorXP
      )
    ) {
      setXp(
        valor => valor + 100
      )

      setHistorico(
        lista => [
          ...lista,
          identificadorXP
        ]
      )
    }
  }, [
    treinoCompleto,
    identificadorXP,
    historico,
    treinoAberto
  ])

  // =========================================
  // NÍVEL
  // =========================================

  const nivel =
    Math.floor(xp / 500) + 1

  const xpAtual =
    xp % 500

  const progressoXP =
    Math.round(
      (
        xpAtual /
        500
      ) * 100
    )

  let titulo = 'Iniciante'

  if (nivel >= 2) {
    titulo = 'Determinado'
  }

  if (nivel >= 3) {
    titulo = 'Atleta'
  }

  if (nivel >= 5) {
    titulo = 'Elite'
  }

  if (nivel >= 10) {
    titulo = 'Lenda'
  }

  // =========================================
  // PERFIL PREENCHIDO
  // =========================================

  const perfilPreenchido =
    idade !== '' &&
    peso !== ''

  // =========================================
  // ALIMENTAÇÃO
  // =========================================

  function marcarRefeicao(
    indice
  ) {
    const lista =
      [...refeicoes]

    lista[indice] = {
      ...lista[indice],
      feita:
        !lista[indice].feita
    }

    setRefeicoes(lista)
  }

  let refeicoesFeitas = 0

  for (
    const refeicao of refeicoes
  ) {
    if (refeicao.feita) {
      refeicoesFeitas++
    }
  }

  const progressoAlimentacao =
    refeicoes.length > 0
      ? Math.round(
          (
            refeicoesFeitas /
            refeicoes.length
          ) * 100
        )
      : 0

  // =========================================
  // ÁGUA
  // =========================================

  const metaAgua = 8

  function adicionarAgua() {
    setAgua(
      valor => {
        if (valor >= metaAgua) {
          return metaAgua
        }

        return valor + 1
      }
    )
  }

  function removerAgua() {
    setAgua(
      valor => {
        if (valor <= 0) {
          return 0
        }

        return valor - 1
      }
    )
  }

  function clicarCopo(
    indice
  ) {
    if (indice < agua) {
      setAgua(indice)
      return
    }

    setAgua(indice + 1)
  }

  // =========================================
  // SEMANA
  // =========================================

  const agora =
    new Date()

  const diaSemana =
    agora.getDay()

  const inicioSemana =
    new Date(agora)

  const diferenca =
    diaSemana === 0
      ? 6
      : diaSemana - 1

  inicioSemana.setDate(
    agora.getDate() -
    diferenca
  )

  const inicioSemanaString =
    inicioSemana
      .toISOString()
      .split('T')[0]

  let treinosSemana = 0

  for (
    const item of historico
  ) {
    const data =
      item
        .split('-')
        .slice(0, 3)
        .join('-')

    if (
      data >=
      inicioSemanaString
    ) {
      treinosSemana++
    }
  }

  const progressoSemana =
    Math.min(
      100,
      Math.round(
        (
          treinosSemana /
          semanaMeta
        ) * 100
      )
    )

  // =========================================
  // DATAS
  // =========================================

  const datasUnicas = []

  for (
    const item of historico
  ) {
    const data =
      item
        .split('-')
        .slice(0, 3)
        .join('-')

    if (
      !datasUnicas.includes(data)
    ) {
      datasUnicas.push(data)
    }
  }

  // =========================================
  // SEQUÊNCIA
  // =========================================

  let sequencia = 0

  let dataVerificar =
    new Date()

  while (true) {
    const dataTexto =
      dataVerificar
        .toISOString()
        .split('T')[0]

    if (
      datasUnicas.includes(
        dataTexto
      )
    ) {
      sequencia++

      dataVerificar.setDate(
        dataVerificar.getDate() -
        1
      )
    } else {
      break
    }
  }

  // =========================================
  // CALENDÁRIO
  // =========================================

  const dias = [
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB',
    'DOM'
  ]

  const calendario = []

  for (
    let i = 0;
    i < 7;
    i++
  ) {
    const data =
      new Date(
        inicioSemana
      )

    data.setDate(
      inicioSemana.getDate() +
      i
    )

    const texto =
      data
        .toISOString()
        .split('T')[0]

    calendario.push({
      nome: dias[i],
      dia: data.getDate(),
      treinou:
        datasUnicas.includes(
          texto
        )
    })
  }

  // =========================================
  // CONQUISTAS
  // =========================================

  const quantidadeTreinos =
    historico.length

  const conquistas = [
    {
      nome: 'Primeiro treino',
      descricao:
        'Complete seu primeiro treino.',
      icone: '🥉',
      desbloqueada:
        quantidadeTreinos >= 1
    },
    {
      nome: '5 treinos',
      descricao:
        'Complete 5 treinos.',
      icone: '🔥',
      desbloqueada:
        quantidadeTreinos >= 5
    },
    {
      nome: '10 treinos',
      descricao:
        'Complete 10 treinos.',
      icone: '💪',
      desbloqueada:
        quantidadeTreinos >= 10
    },
    {
      nome: '500 XP',
      descricao:
        'Alcance 500 XP.',
      icone: '🥈',
      desbloqueada:
        xp >= 500
    },
    {
      nome: '1.000 XP',
      descricao:
        'Alcance 1.000 XP.',
      icone: '🥇',
      desbloqueada:
        xp >= 1000
    },
    {
      nome: '2.500 XP',
      descricao:
        'Alcance 2.500 XP.',
      icone: '💎',
      desbloqueada:
        xp >= 2500
    },
    {
      nome: '5.000 XP',
      descricao:
        'Alcance 5.000 XP.',
      icone: '👑',
      desbloqueada:
        xp >= 5000
    },
    {
      nome: 'Sequência de 3',
      descricao:
        'Treine por 3 dias seguidos.',
      icone: '🔥',
      desbloqueada:
        sequencia >= 3
    },
    {
      nome: 'Sequência de 7',
      descricao:
        'Treine por 7 dias seguidos.',
      icone: '⚡',
      desbloqueada:
        sequencia >= 7
    },
    {
      nome: 'Hidratado',
      descricao:
        'Beba 8 copos de água.',
      icone: '💧',
      desbloqueada:
        agua >= 8
    },
    {
      nome: 'Alimentação',
      descricao:
        'Complete todas as refeições.',
      icone: '🍎',
      desbloqueada:
        progressoAlimentacao === 100
    }
  ]

  const conquistasDesbloqueadas =
    conquistas.filter(
      item => item.desbloqueada
    ).length

  // =========================================
  // METAS
  // =========================================

  const metasDia = [
    {
      nome: 'Completar treino',
      feito:
        treinoCompleto,
      icone: '🏋️'
    },
    {
      nome: '8 copos de água',
      feito:
        agua >= 8,
      icone: '💧'
    },
    {
      nome: 'Completar refeições',
      feito:
        progressoAlimentacao === 100,
      icone: '🍎'
    }
  ]

  const metasCompletas =
    metasDia.filter(
      meta => meta.feito
    ).length

  // =========================================
  // SALVAR PERFIL
  // =========================================

  function salvarPerfil() {
    localStorage.setItem(
      'nome',
      nome
    )

    localStorage.setItem(
      'idade',
      idade
    )

    localStorage.setItem(
      'peso',
      peso
    )
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <div
      className={
        escuro
          ? 'app dark'
          : 'app'
      }
    >

      {/* SIDEBAR */}

      <aside className="sidebar">

        <h2>
          💪 FitApp
        </h2>

        <p>
          Seu painel de evolução
        </p>

        <button
          onClick={() =>
            setTela('inicio')
          }
        >
          🏠 Início
        </button>

        <button
          onClick={() =>
            setTela('treinos')
          }
        >
          🏋️ Treinos
        </button>

        <button
          onClick={() =>
            setTela('alimentacao')
          }
        >
          🍎 Alimentação
        </button>

        <button
          onClick={() =>
            setTela('progresso')
          }
        >
          📈 Progresso
        </button>

        <button
          onClick={() =>
            setTela('perfil')
          }
        >
          👤 Perfil
        </button>

        <button
          onClick={() =>
            setEscuro(!escuro)
          }
        >
          {escuro
            ? '☀️ Modo claro'
            : '🌙 Modo escuro'}
        </button>

      </aside>

      <main className="content">

        {/* =================================
            TELA DE TREINO
        ================================= */}

        {telaTreino &&
          tela === 'treinos' &&
          treinoAberto && (

          <div className="treino-screen">

            <button
              className="back-training"
              onClick={
                fecharTreino
              }
            >
              ← Voltar para treinos
            </button>

            <div className="training-header">

              <span className="training-day">
                🔥 TREINO DE HOJE
              </span>

              <div className="training-icon">
                {treinoHoje.icone}
              </div>

              <h1>
                {treinoAberto.nome}
              </h1>

              <p>
                {treinoHoje.grupo}
              </p>

              <div className="training-progress">

                <div className="training-progress-top">

                  <strong>
                    {porcentagemTreino}%
                  </strong>

                  <span>
                    {seriesFeitas} / {totalSeries} séries
                  </span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress"
                    style={{
                      width:
                        porcentagemTreino +
                        '%'
                    }}
                  />

                </div>

              </div>

            </div>

            <div className="card">

              <h2>
                🏋️ Seu treino
              </h2>

              <p>
                Marque cada série assim que terminar.
              </p>

            </div>

            <div className="cards">

              {treinoAberto.exercicios.map(
                (
                  exercicio,
                  indice
                ) => {

                  const chave =
                    pegarChaveSerie(
                      indice
                    )

                  const lista =
                    seriesConcluidas[
                      chave
                    ] || []

                  const feitas =
                    quantidadeSeriesFeitas(
                      indice
                    )

                  const completo =
                    feitas >=
                    exercicio.series

                  return (
                    <div
                      className={
                        completo
                          ? 'card completed-exercise training-exercise'
                          : 'card training-exercise'
                      }
                      key={indice}
                    >

                      <div className="exercise-heading">

                        <div className="exercise-icon">
                          {completo
                            ? '✅'
                            : '🏋️'}
                        </div>

                        <div>

                          <h2>
                            {exercicio.nome}
                          </h2>

                          <p>
                            {exercicio.series} séries ×{' '}
                            {exercicio.repeticoes} repetições
                          </p>

                        </div>

                      </div>

                      <div className="series-title">

                        <strong>
                          Séries
                        </strong>

                        <span>
                          {feitas}/
                          {exercicio.series}
                        </span>

                      </div>

                      <div className="series-buttons">

                        {Array.from(
                          {
                            length:
                              exercicio.series
                          }
                        ).map(
                          (
                            _,
                            serieIndice
                          ) => {

                            const feita =
                              lista[
                                serieIndice
                              ] === true

                            return (
                              <button
                                className={
                                  feita
                                    ? 'serie-button feita'
                                    : 'serie-button'
                                }
                                key={
                                  serieIndice
                                }
                                onClick={() =>
                                  marcarSerie(
                                    indice,
                                    serieIndice
                                  )
                                }
                              >

                                <span>
                                  {feita
                                    ? '✓'
                                    : serieIndice + 1}
                                </span>

                                <small>
                                  Série
                                </small>

                              </button>
                            )
                          }
                        )}

                      </div>

                      {completo && (
                        <div className="exercise-done">
                          ✅ Exercício concluído
                        </div>
                      )}

                      <button
                        onClick={() =>
                          reiniciarSeries(
                            indice
                          )
                        }
                      >
                        ↻ Reiniciar séries
                      </button>

                    </div>
                  )
                }
              )}

            </div>

            <div className="card timer-card">

              <h2>
                ⏱️ Descanso
              </h2>

              <div className="timer-number">
                {tempo}s
              </div>

              <button
                onClick={() =>
                  setRodando(!rodando)
                }
              >
                {rodando
                  ? 'Pausar'
                  : 'Iniciar'}
              </button>

              <button
                onClick={() => {
                  setTempo(15)
                  setRodando(false)
                }}
              >
                Reiniciar
              </button>

            </div>

            {treinoCompleto && (

              <div className="completed training-finished">

                <div className="finish-icon">
                  🏆
                </div>

                <h2>
                  TREINO CONCLUÍDO!
                </h2>

                <p>
                  Você terminou todas as séries.
                </p>

                <strong>
                  ⭐ +100 XP
                </strong>

              </div>

            )}

          </div>
        )}

        {/* =================================
            INÍCIO
        ================================= */}

        {tela === 'inicio' &&
          !telaTreino && (
          <>

            <div className="welcome">

              <div>

                <p>
                  SEU PAINEL
                </p>

                <h1>
                  Olá, {nome}! 👋
                </h1>

                <p>
                  Vamos evoluir hoje?
                </p>

              </div>

              <div className="welcome-icon">
                💪
              </div>

            </div>

            <div className="xp-card">

              <div className="xp-top">

                <div>

                  <span>
                    NÍVEL {nivel}
                  </span>

                  <h2>
                    {titulo}
                  </h2>

                </div>

                <strong>
                  ⭐ {xp} XP
                </strong>

              </div>

              <div className="xp-bar">

                <div
                  className="xp-progress"
                  style={{
                    width:
                      progressoXP +
                      '%'
                  }}
                />

              </div>

              <p>
                {xpAtual} / 500 XP
              </p>

            </div>

            <div className="stats">

              <div className="stat-card">
                <span>🔥</span>

                <div>
                  <strong>
                    {quantidadeTreinos}
                  </strong>

                  <p>
                    Treinos
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <span>⭐</span>

                <div>
                  <strong>
                    {xp}
                  </strong>

                  <p>
                    XP
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <span>🔥</span>

                <div>
                  <strong>
                    {sequencia}
                  </strong>

                  <p>
                    Dias seguidos
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <span>🏆</span>

                <div>
                  <strong>
                    {conquistasDesbloqueadas}
                  </strong>

                  <p>
                    Conquistas
                  </p>
                </div>
              </div>

            </div>

            <div className="card">

              <h2>
                🏋️ Treino de hoje
              </h2>

              {treinoHoje ? (
                <>

                  <h3>
                    {treinoHoje.icone}{' '}
                    {treinoHoje.treino.nome}
                  </h3>

                  <p>
                    {treinoHoje.grupo}
                  </p>

                  <p>
                    {treinoHoje.treino.exercicios.length}
                    {' '}exercícios
                  </p>

                  <button
                    className="main-button"
                    onClick={
                      abrirTreino
                    }
                  >
                    Treinar agora →
                  </button>

                </>
              ) : (
                <>

                  <h3>
                    😴 Dia de descanso
                  </h3>

                  <p>
                    Hoje é domingo.
                    Aproveite para descansar.
                  </p>

                </>
              )}

            </div>

            <div className="card">

              <div className="card-title-row">

                <h2>
                  🎯 Meta semanal
                </h2>

                <strong>
                  {treinosSemana}/
                  {semanaMeta}
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress"
                  style={{
                    width:
                      progressoSemana +
                      '%'
                  }}
                />

              </div>

              <p>
                {treinosSemana >= semanaMeta
                  ? '🏆 Meta concluída!'
                  : 'Faltam ' +
                    (
                      semanaMeta -
                      treinosSemana
                    ) +
                    ' treinos'}
              </p>

            </div>

            <div className="card">

              <h2>
                📅 Semana
              </h2>

              <div className="calendar">

                {calendario.map(
                  (
                    dia,
                    indice
                  ) => (

                    <div
                      className={
                        dia.treinou
                          ? 'calendar-day trained'
                          : 'calendar-day'
                      }
                      key={indice}
                    >

                      <span>
                        {dia.nome}
                      </span>

                      <strong>
                        {dia.dia}
                      </strong>

                      <small>
                        {dia.treinou
                          ? '🔥'
                          : '—'}
                      </small>

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="card">

              <div className="card-title-row">

                <h2>
                  🎯 Metas de hoje
                </h2>

                <strong>
                  {metasCompletas}/3
                </strong>

              </div>

              <div className="daily-goals">

                {metasDia.map(
                  (
                    meta,
                    indice
                  ) => (

                    <div
                      className={
                        meta.feito
                          ? 'goal done'
                          : 'goal'
                      }
                      key={indice}
                    >

                      <span>
                        {meta.icone}
                      </span>

                      <strong>
                        {meta.nome}
                      </strong>

                      <span>
                        {meta.feito
                          ? '✅'
                          : '⬜'}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* ÁGUA */}

            <div className="card water-card">

              <h2>
                💧 Hidratação
              </h2>

              <p>
                Toque nos copos para registrar sua água.
              </p>

              <div className="water-cups">

                {Array.from(
                  {
                    length: metaAgua
                  }
                ).map(
                  (
                    _,
                    indice
                  ) => {

                    const cheio =
                      indice < agua

                    return (
                      <button
                        className={
                          cheio
                            ? 'water-cup filled'
                            : 'water-cup'
                        }
                        key={
                          indice
                        }
                        onClick={() =>
                          clicarCopo(
                            indice
                          )
                        }
                      >
                        {cheio
                          ? '💧'
                          : '⬜'}
                      </button>
                    )
                  }
                )}

              </div>

              <div className="water-counter">

                <strong>
                  {agua}/{metaAgua}
                </strong>

                <span>
                  copos
                </span>

              </div>

              <div className="water-buttons">

                <button
                  onClick={
                    removerAgua
                  }
                >
                  −
                </button>

                <button
                  onClick={
                    adicionarAgua
                  }
                >
                  + Adicionar copo
                </button>

              </div>

            </div>

          </>
        )}

        {/* =================================
            TREINOS DA SEMANA
        ================================= */}

        {tela === 'treinos' &&
          !telaTreino && (
          <>

            <h1>
              🏋️ Treinos da semana
            </h1>

            <p>
              Apenas o treino de hoje está disponível.
            </p>

            <div className="week-workouts">

              {Object.keys(
                treinos
              ).map(
                tipo => {

                  const treino =
                    treinos[tipo]

                  const disponivel =
                    tipo ===
                    treinoDeHoje

                  return (

                    <div
                      className={
                        disponivel
                          ? 'week-workout available'
                          : 'week-workout locked'
                      }
                      key={tipo}
                      onClick={() => {

                        if (
                          disponivel
                        ) {
                          abrirTreino()
                        }

                      }}
                    >

                      <div className="week-workout-icon">

                        {disponivel
                          ? treino.icone
                          : '🔒'}

                      </div>

                      <div className="week-workout-info">

                        <span>
                          {treino.nomeDia}
                        </span>

                        <h2>
                          {treino.treino.nome}
                        </h2>

                        <p>
                          {treino.grupo}
                        </p>

                      </div>

                      <div className="week-workout-status">

                        {disponivel
                          ? '🔥 Treinar'
                          : '🔒 Bloqueado'}

                      </div>

                    </div>

                  )
                }
              )}

              {diaAtual === 0 && (

                <div className="rest-day-card">

                  <div>
                    😴
                  </div>

                  <div>

                    <h2>
                      Domingo — descanso
                    </h2>

                    <p>
                      O próximo treino será liberado amanhã.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </>
        )}

        {/* =================================
            ALIMENTAÇÃO
        ================================= */}

        {tela === 'alimentacao' &&
          !telaTreino && (
          <>

            <h1>
              🍎 Alimentação
            </h1>

            <p>
              Acompanhe suas refeições.
            </p>

            {perfilPreenchido && (

              <div className="recommended-food">

                <div className="recommended-header">

                  <span>
                    ✨
                  </span>

                  <div>

                    <h2>
                      Alimentação recomendada
                    </h2>

                    <p>
                      Sugestões gerais para uma alimentação variada.
                    </p>

                  </div>

                </div>

                <div className="food-cards">

                  {Number(idade) <= 10 && (
                    <>

                      <div className="food-card">

                        <span className="food-icon">
                          🌅
                        </span>

                        <div>

                          <h3>
                            Café da manhã
                          </h3>

                          <p>
                            Frutas, cereais, leite ou outra opção variada para começar o dia.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍛
                        </span>

                        <div>

                          <h3>
                            Almoço
                          </h3>

                          <p>
                            Arroz, feijão, verduras, legumes e uma fonte de proteína.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍎
                        </span>

                        <div>

                          <h3>
                            Lanche
                          </h3>

                          <p>
                            Frutas e outras opções variadas, de preferência junto da família.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🌙
                        </span>

                        <div>

                          <h3>
                            Jantar
                          </h3>

                          <p>
                            Uma refeição variada, com diferentes grupos de alimentos.
                          </p>

                        </div>

                      </div>

                    </>
                  )}

                  {Number(idade) >= 11 &&
                    Number(idade) <= 17 && (
                    <>

                      <div className="food-card">

                        <span className="food-icon">
                          🌅
                        </span>

                        <div>

                          <h3>
                            Café da manhã
                          </h3>

                          <p>
                            Varie entre frutas, cereais e alimentos como leite, iogurte ou ovos.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍛
                        </span>

                        <div>

                          <h3>
                            Almoço
                          </h3>

                          <p>
                            Priorize arroz, feijão, verduras, legumes e uma fonte de proteína.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍎
                        </span>

                        <div>

                          <h3>
                            Lanche
                          </h3>

                          <p>
                            Frutas, iogurte, sanduíches ou outras opções variadas.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🌙
                        </span>

                        <div>

                          <h3>
                            Jantar
                          </h3>

                          <p>
                            Faça uma refeição variada e prefira alimentos in natura ou minimamente processados.
                          </p>

                        </div>

                      </div>

                    </>
                  )}

                  {Number(idade) >= 18 &&
                    Number(idade) < 60 && (
                    <>

                      <div className="food-card">

                        <span className="food-icon">
                          🌅
                        </span>

                        <div>

                          <h3>
                            Café da manhã
                          </h3>

                          <p>
                            Combine frutas, cereais e uma fonte de proteína em uma refeição variada.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍛
                        </span>

                        <div>

                          <h3>
                            Almoço
                          </h3>

                          <p>
                            Priorize alimentos variados, como arroz, feijão, vegetais e proteínas.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍎
                        </span>

                        <div>

                          <h3>
                            Lanche
                          </h3>

                          <p>
                            Escolha alimentos variados e prefira opções pouco processadas.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🌙
                        </span>

                        <div>

                          <h3>
                            Jantar
                          </h3>

                          <p>
                            Mantenha variedade de alimentos e priorize preparações caseiras.
                          </p>

                        </div>

                      </div>

                    </>
                  )}

                  {Number(idade) >= 60 && (
                    <>

                      <div className="food-card">

                        <span className="food-icon">
                          🌅
                        </span>

                        <div>

                          <h3>
                            Café da manhã
                          </h3>

                          <p>
                            Procure uma refeição variada, com frutas e alimentos de diferentes grupos.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍛
                        </span>

                        <div>

                          <h3>
                            Almoço
                          </h3>

                          <p>
                            Varie entre feijão, verduras, legumes e fontes de proteína.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🍎
                        </span>

                        <div>

                          <h3>
                            Lanche
                          </h3>

                          <p>
                            Frutas e outras opções variadas podem fazer parte da rotina.
                          </p>

                        </div>

                      </div>

                      <div className="food-card">

                        <span className="food-icon">
                          🌙
                        </span>

                        <div>

                          <h3>
                            Jantar
                          </h3>

                          <p>
                            Prefira uma refeição variada e adequada às necessidades individuais.
                          </p>

                        </div>

                      </div>

                    </>
                  )}

                </div>

              </div>

            )}

            {!perfilPreenchido && (

              <div className="card">

                <h2>
                  👤 Complete seu perfil
                </h2>

                <p>
                  Preencha sua idade e seu peso na aba Perfil para liberar esta seção.
                </p>

                <button
                  className="main-button"
                  onClick={() =>
                    setTela('perfil')
                  }
                >
                  Ir para meu perfil →
                </button>

              </div>

            )}

            <div className="card">

              <h2>
                Progresso
              </h2>

              <div className="progress-bar">

                <div
                  className="progress"
                  style={{
                    width:
                      progressoAlimentacao +
                      '%'
                  }}
                />

              </div>

              <strong>
                {progressoAlimentacao}%
              </strong>

            </div>

            <div className="cards">

              {refeicoes.map(
                (
                  refeicao,
                  indice
                ) => (

                  <div
                    className={
                      refeicao.feita
                        ? 'card completed-exercise'
                        : 'card'
                    }
                    key={indice}
                  >

                    <h3>
                      {refeicao.feita
                        ? '✅'
                        : '🍽️'}{' '}
                      {refeicao.nome}
                    </h3>

                    <p>
                      ⏰ {refeicao.horario}
                    </p>

                    <button
                      onClick={() =>
                        marcarRefeicao(
                          indice
                        )
                      }
                    >
                      {refeicao.feita
                        ? 'Desmarcar'
                        : 'Marcar como feita'}
                    </button>

                  </div>

                )
              )}

            </div>

            {/* ÁGUA NA ALIMENTAÇÃO */}

            <div className="card water-card">

              <h2>
                💧 Hidratação
              </h2>

              <p>
                Toque nos copos para registrar sua água.
              </p>

              <div className="water-cups">

                {Array.from(
                  {
                    length:
                      metaAgua
                  }
                ).map(
                  (
                    _,
                    indice
                  ) => {

                    const cheio =
                      indice < agua

                    return (
                      <button
                        className={
                          cheio
                            ? 'water-cup filled'
                            : 'water-cup'
                        }
                        key={
                          indice
                        }
                        onClick={() =>
                          clicarCopo(
                            indice
                          )
                        }
                      >
                        {cheio
                          ? '💧'
                          : '⬜'}
                      </button>
                    )
                  }
                )}

              </div>

              <div className="water-counter">

                <strong>
                  {agua}/{metaAgua}
                </strong>

                <span>
                  copos
                </span>

              </div>

              <div className="water-buttons">

                <button
                  onClick={
                    removerAgua
                  }
                >
                  −
                </button>

                <button
                  onClick={
                    adicionarAgua
                  }
                >
                  + Adicionar
                </button>

              </div>

            </div>

          </>
        )}

        {/* =================================
            PROGRESSO
        ================================= */}

        {tela === 'progresso' &&
          !telaTreino && (
          <>

            <h1>
              📈 Meu progresso
            </h1>

            <div className="xp-card">

              <h2>
                ⭐ {xp} XP
              </h2>

              <h3>
                Nível {nivel} — {titulo}
              </h3>

              <div className="xp-bar">

                <div
                  className="xp-progress"
                  style={{
                    width:
                      progressoXP +
                      '%'
                  }}
                />

              </div>

              <p>
                {xpAtual} / 500 XP
              </p>

            </div>

            <div className="stats">

              <div className="stat-card">

                <span>
                  🔥
                </span>

                <div>

                  <strong>
                    {quantidadeTreinos}
                  </strong>

                  <p>
                    Treinos
                  </p>

                </div>

              </div>

              <div className="stat-card">

                <span>
                  ⭐
                </span>

                <div>

                  <strong>
                    {xp}
                  </strong>

                  <p>
                    XP
                  </p>

                </div>

              </div>

              <div className="stat-card">

                <span>
                  🔥
                </span>

                <div>

                  <strong>
                    {sequencia}
                  </strong>

                  <p>
                    Sequência
                  </p>

                </div>

              </div>

            </div>

            <h2>
              🏆 Conquistas
            </h2>

            <div className="cards">

              {conquistas.map(
                (
                  conquista,
                  indice
                ) => (

                  <div
                    className={
                      conquista.desbloqueada
                        ? 'card achievement'
                        : 'card achievement locked'
                    }
                    key={indice}
                  >

                    <h2>
                      {conquista.icone}
                    </h2>

                    <h3>
                      {conquista.nome}
                    </h3>

                    <p>
                      {conquista.descricao}
                    </p>

                    <strong>
                      {conquista.desbloqueada
                        ? '✅ Desbloqueada'
                        : '🔒 Bloqueada'}
                    </strong>

                  </div>

                )
              )}

            </div>

          </>
        )}

        {/* =================================
            PERFIL
        ================================= */}

        {tela === 'perfil' &&
          !telaTreino && (
          <>

            <h1>
              👤 Meu perfil
            </h1>

            <p>
              Complete seus dados para personalizar seu perfil.
            </p>

            <div className="profile-card">

              <div className="avatar">
                👤
              </div>

              <h2>
                {nome || 'Seu nome'}
              </h2>

              <div className="profile-form">

                <div className="profile-field">

                  <label>
                    Nome
                  </label>

                  <input
                    type="text"
                    value={nome}
                    placeholder="Digite seu nome"
                    onChange={
                      evento =>
                        setNome(
                          evento.target.value
                        )
                    }
                  />

                </div>

                <div className="profile-field">

                  <label>
                    Idade
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={idade}
                    placeholder="Digite sua idade"
                    onChange={
                      evento =>
                        setIdade(
                          evento.target.value
                        )
                    }
                  />

                </div>

                <div className="profile-field">

                  <label>
                    Peso
                  </label>

                  <div className="weight-input">

                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      value={peso}
                      placeholder="Digite seu peso"
                      onChange={
                        evento =>
                          setPeso(
                            evento.target.value
                          )
                      }
                    />

                    <span>
                      kg
                    </span>

                  </div>

                </div>

                <button
                  className="save-profile-button"
                  onClick={
                    salvarPerfil
                  }
                >
                  💾 Salvar perfil
                </button>

              </div>

              <div className="profile-stats">

                <div>

                  <strong>
                    {nivel}
                  </strong>

                  <span>
                    Nível
                  </span>

                </div>

                <div>

                  <strong>
                    {xp}
                  </strong>

                  <span>
                    XP
                  </span>

                </div>

                <div>

                  <strong>
                    {quantidadeTreinos}
                  </strong>

                  <span>
                    Treinos
                  </span>

                </div>

              </div>

              {(idade || peso) && (

                <div className="profile-info-box">

                  {idade && (

                    <div>

                      <span>
                        🎂 Idade
                      </span>

                      <strong>
                        {idade} anos
                      </strong>

                    </div>

                  )}

                  {peso && (

                    <div>

                      <span>
                        ⚖️ Peso
                      </span>

                      <strong>
                        {peso} kg
                      </strong>

                    </div>

                  )}

                </div>

              )}

            </div>

          </>
        )}

      </main>

    </div>
  )
}

export default App