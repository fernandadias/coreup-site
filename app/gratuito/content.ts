// Copy da página /gratuito — centralizado pra edição fácil sem mexer no JSX.
// TODO(Fernanda): trocar VIDEO_YOUTUBE_ID pelo ID real do vídeo unlisted.
export const VIDEO_YOUTUBE_ID = "dQw4w9WgXcQ";

export const HERO = {
  eyebrow: "Gratuito · 5 aulas por email",
  title: "Por que você ",
  titleHighlight: "não evoluiu?",
  subtitle:
    "Você treina, come direito, e mesmo assim o shape não muda. A perna não cresce, a recomposição não acontece, a postura continua travada. Não é preguiça nem falta de disciplina: é que ninguém te contou que quem trabalha sentado precisa de um método diferente. Nessas 5 aulas eu te mostro o que muda — e o que fazer sobre isso.",
  videoTitle: "Me assiste em 60 segundos explicando o que você vai receber:",
};

export const BULLETS = [
  "Por que você é sedentária mesmo treinando todo dia (e o que fazer)",
  "Iliopsoas encurtado: o músculo que trava sua perna e seu agachamento",
  "Como ajustar dieta e mentalidade pra recomposição corporal de verdade",
  "Mobilidade que destrava performance (não é só pra tirar dor)",
  "1 email por dia, direto no seu inbox — sem enrolação",
];

export const FAQ = [
  {
    q: "Isso é pra quem já treina ou pra quem tá começando?",
    a: "Pra quem treina e sente que trava. Se você malha há meses ou anos e o shape não evolui como deveria, é exatamente pra você. Quem tá começando também aproveita — só que o contexto das aulas assume que você já tem alguma rotina.",
  },
  {
    q: "Por que é gratuito?",
    a: "Porque eu quero que você entenda como eu penso antes de decidir se quer trabalhar comigo. Essas 5 aulas são um recorte do método que eu aplico com os alunos do CoreUP Team — se fizer sentido, a gente continua.",
  },
  {
    q: "Quanto tempo dura cada aula?",
    a: "Entre 5 e 10 minutos. É conteúdo denso, direto ao ponto. Sem intro, sem enrolação, sem repetir o mesmo mantra que você já ouviu em mil reels.",
  },
  {
    q: "Preciso de equipamento?",
    a: "Não. As aulas são pra você aplicar antes do treino, no intervalo do trabalho ou em casa. Só o peso do corpo e, no máximo, uma cadeira.",
  },
];

export const SUCCESS = {
  title: "Pronto! Aula 1 já tá indo",
  description:
    "A primeira aula acabou de ser disparada pro seu email — deve chegar em até 2 minutos. Confere a caixa de spam se demorar. Nos próximos 4 dias você recebe uma aula por dia, na mesma sequência que eu uso com os alunos pagos.",
  waMessage: (firstName: string) =>
    firstName
      ? `Oi Fernanda! Sou ${firstName}, acabei de me inscrever nas 5 aulas e queria receber também por aqui.`
      : "Oi Fernanda! Acabei de me inscrever nas 5 aulas e queria receber também por aqui.",
  waLabel: "Receber também no WhatsApp",
};
