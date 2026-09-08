import type { CardContent } from "../types/card";
import type { SolutionFeature } from "../types/solution";

export const functionalityCards: CardContent[] = [
  {
    title: "Missões",
    description:
      "O usuário recebe sugestões de atividades sustentáveis e pequenas tarefas para realizar dentro da plataforma.",
  },
  {
    title: "Ações",
    description:
      "Curtidas, comentários, participação em comunidades e registros sustentáveis ajudam o usuário a avançar no sistema.",
  },
  {
    title: "Progresso",
    description:
      "O foguinho mostra visualmente o quanto o usuário evoluiu naquele ciclo de uso.",
  },
  {
    title: "Pontos",
    description:
      "As ações realizadas geram pontos proporcionais ao esforço e à relevância de cada interação.",
  },
  {
    title: "Recompensas",
    description:
      "Os pontos podem desbloquear itens especiais, acessórios e recursos de personalização do avatar.",
  },
  {
    title: "Conta de luz",
    description:
      "A proposta também permite conectar o engajamento digital ao apoio no pagamento da conta de luz.",
  },
];

export const solutionFeatures: SolutionFeature[] = [
  {
    slug: "missoes",
    title: "Missões sustentáveis",
    summary:
      "Sugestões simples orientam o usuário a realizar ações dentro e fora da SoulUp.",
    description:
      "As missões ajudam o usuário a entender qual ação fazer em seguida, sem transformar a experiência em algo cansativo. Elas podem envolver participação em comunidades, registro de hábitos sustentáveis ou interação com conteúdos da plataforma.",
    result:
      "Mais clareza no uso diário e mais incentivo para voltar ao aplicativo com frequência.",
    actions: [
      "Receber uma missão adequada ao perfil de uso.",
      "Concluir a atividade sugerida pela plataforma.",
      "Ganhar pontos proporcionais ao esforço da ação.",
    ],
  },
  {
    slug: "foguinho",
    title: "Foguinho progressivo",
    summary:
      "O progresso visual mostra quanto cada interação contribui para manter o ciclo ativo.",
    description:
      "Diferente de sistemas em que um simples login já mantém a sequência, o foguinho progressivo cresce conforme a relevância das ações realizadas pelo usuário.",
    result:
      "O usuário percebe valor nas pequenas ações, mas também entende que atitudes mais completas geram mais avanço.",
    actions: [
      "Curtir, comentar ou interagir com conteúdos.",
      "Participar de comunidades da SoulUp.",
      "Registrar ações sustentáveis com maior impacto.",
    ],
  },
  {
    slug: "pontos",
    title: "Pontos e recompensas",
    summary:
      "As ações geram pontos que podem virar personalização, benefícios e recompensas.",
    description:
      "O sistema de pontos torna o engajamento mais concreto. Com isso, cada avanço dentro da SoulUp pode ser percebido como parte de uma conquista acumulada.",
    result:
      "A experiência fica mais motivadora e cria um motivo claro para o usuário continuar participando.",
    actions: [
      "Acumular pontos a partir das missões.",
      "Trocar pontos por itens do avatar.",
      "Conectar pontos a benefícios ligados à conta de luz.",
    ],
  },
  {
    slug: "avatar",
    title: "Avatar personalizado",
    summary:
      "O SoulAI funciona como um companheiro digital que orienta, reconhece e motiva.",
    description:
      "O avatar conversa com o usuário, reconhece conquistas e ajuda a traduzir funcionalidades da SoulUp em interações mais humanas e fáceis de entender.",
    result:
      "A plataforma ganha uma camada de proximidade, especialmente para usuários jovens e acostumados com experiências digitais personalizadas.",
    actions: [
      "Receber mensagens de incentivo.",
      "Visualizar conquistas e progresso.",
      "Desbloquear acessórios e variações visuais.",
    ],
  },
];

export const flowSteps: CardContent[] = [
  {
    title: "01",
    description:
      "O usuário acessa a plataforma SoulUp e inicia sua experiência diária.",
  },
  {
    title: "02",
    description:
      "O avatar SoulAI aparece como um companheiro digital dentro do aplicativo.",
  },
  {
    title: "03",
    description:
      "O sistema sugere missões, conteúdos e pequenas ações sustentáveis.",
  },
  {
    title: "04",
    description:
      "Cada interação realizada preenche uma porcentagem do foguinho progressivo.",
  },
  {
    title: "05",
    description:
      "O usuário acumula pontos de acordo com o nível de esforço de cada ação.",
  },
  {
    title: "06",
    description:
      "Os pontos podem ser usados em recompensas, personalização e apoio na conta de luz.",
  },
  {
    title: "07",
    description:
      "A experiência incentiva o retorno frequente sem tornar o uso pesado ou cansativo.",
  },
];