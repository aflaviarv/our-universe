# Changelog

Acompanhamento detalhado de todas as alterações, correções e evolução da arquitetura do projeto **Our Universe**. O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2026-06-01

### Novas Funcionalidades
- **Sistema de Áudio Imersivo:** Implementação de player invisível (iFrame YouTube) no componente `Universe.jsx`, permitindo a execução de música de fundo em *loop* infinito.
- **Configuração de Timestamp:** Adicionado controle preciso de início da música no painel administrativo, com interface intuitiva que permite ao administrador visualizar o vídeo e definir o momento exato de reprodução (suporta formato `M:SS`).
- **Orquestração de Autoplay:** Integração da `WelcomeOverlay` no fluxo de acesso via link de presente, garantindo a interação obrigatória do usuário para a liberação do áudio pelos navegadores modernos (*Autoplay Policy Compliance*).
- **UX de Configuração de Mídia:** Criação de modal dedicado `🎵 Configurar Música` no painel administrativo, isolando as configurações de áudio da área de edição, permitindo testes de reprodução (Preview) e mantendo o ambiente de edição silencioso.

### Refatoração e Otimizações
- **Arquitetura de Estilização:** Migração completa de estilos `inline` (`style={{...}}`) para classes CSS externas no `index.css`, garantindo consistência visual e conformidade com as boas práticas de desenvolvimento web.
- **Hierarquia de Camadas (Z-Index):** Refatoração da ordem de renderização no `App.jsx` para assegurar que as estrelas (`BackgroundStars`) e constelações permaneçam sempre visíveis por trás da `WelcomeOverlay`.
- **Coreografia de Entrada:** Ajuste de sequenciamento de animações na `WelcomeOverlay`, sincronizando o *delay* do botão de interação com o término da animação do título principal (*logoIntro*).

### Correções de Bugs
- **Conflito de Background:** Resolvida a falha onde a `WelcomeOverlay` impedia a visualização das estrelas de fundo e constelações devido a conflitos de opacidade e *z-index*.
- **Otimização de Performance:** Remoção de carga desnecessária de estilos nos componentes `.jsx`, consolidando a lógica de design puramente no `index.css`.
- **Persistência de Estado:** Garantida a propagação das novas propriedades `bgMusic` e `musicStart` através da estrutura de `decodeUniverse` e estado do `App.jsx`.


---


## [1.6.0] - 2026-05-27
### Adicionado
- **Segurança:** Implementada expiração automática de 24h para imagens via API do ImgBB.
- **Usabilidade:** Adicionado Modal de Guia ("Como Usar") no Painel Administrativo.
- **Estabilidade:** Adicionado bloqueio preventivo (beforeunload) para evitar fechamento acidental da aba com dados não salvos.
- **Interação:** Implementado fechamento de modais via tecla "Esc".
- **UX/UI:** Menu de seleção de constelação customizado (removido componente nativo do navegador para padrão visual uniforme).
- **UX/UI:** Padronização visual dos botões do Painel Administrativo com estilo "pílula" minimalista.

---

## [1.5.0] - 2026-05-20

### Novas Funcionalidades
- **Fluxo Exclusivo de Presenteado**: Implementada lógica de bloqueio de navegação quando a aplicação é acessada via link gerado (parâmetro de URL). O presenteado vê apenas a opção "Abrir Meu Presente" e tem a navegação travada no universo recebido, sem opção de voltar.
- **Cursor Estelar Persistente**: Substituição do ponteiro padrão do sistema por uma estrela brilhante fixa (`.cursor-star`) com animação de pulsação suave que acompanha o usuário.
- **Coreografia Visual (Home)**: Criação de uma sequência de animações de entrada onde a Logo surge e se posiciona, seguida pelo aparecimento em cascata do subtítulo, botões e texto de propósito, respeitando *delays* milimétricos.
- **Botão de Retorno Condicional**: Adicionado botão "Voltar" no `Universe.jsx`, visível apenas para acessos em Modo Criador/Visualização Padrão.

### Refatoração e Otimizações
- **Otimização do Motor de Partículas (Throttle)**: Adicionado um limitador de tempo (30ms) na geração de partículas do `CometTrail.jsx`, garantindo alta performance e evitando travamentos no DOM durante movimentos bruscos do mouse.
- **Arquitetura CSS Refatorada**: Limpeza total do arquivo `index.css`, remoção de blocos duplicados, organização por sessões lógicas e redução do uso de `!important`.
- **Aprimoramento de UI/UX (Botões)**: Ajustes de *Flexbox* (`justify-content`, `align-items`, `gap`) e tratamento de texto (`white-space: nowrap`, `line-height`) na classe `.btn-stelar` para centralização perfeita do conteúdo, mesmo em quebras de linha.

### Correções de Bugs
- **Visibilidade do Rastro de Cometa**: Corrigido o bug onde as partículas do rastro sumiam, atribuindo as dimensões corretas (`width`/`height`) à classe `.comet-dust`.
- **Alinhamento do Texto de Propósito**: Corrigido o deslocamento lateral da `.purpose-text` através da aplicação correta de `margin: 0 auto`.
- **Prevenção de Falsos Cliques**: Corrigida a falha que criava uma estrela de memória acidentalmente quando o usuário clicava no botão "Voltar".

---

## [1.4.0] - 2026-05-19

### Novas Funcionalidades
- **Navegação Dinâmica**: Implementado o controle centralizado de estados entre `App.jsx` e `Home.jsx`, permitindo a transição fluida entre modo criador (ADM) e visualizador.
- **Sistema de Constelações**: Centralizado o estado da constelação ativa no `App.jsx`, permitindo a troca dinâmica via painel administrativo com reflexo imediato no `Universe.jsx`.
- **Animações de Entrada**: Adicionado efeito *fadeInUp* com *staggering* (atraso escalonado) em todos os elementos da `Home`, garantindo uma entrada profissional e organizada a cada recarregamento da página.

### Refatoração e Correções
- **Remoção de Duplicidade**: Removido componente estático de constelação do `App.jsx` que causava sobreposição visual indesejada.
- **Padronização CSS**: Migração de estilos *inline* para classes CSS no `index.css` (`.btn-stelar`), garantindo consistência visual e manutenibilidade.
- **UX aprimorada**: Adicionado efeito de brilho (*glow*) e escala (*hover scale*) nos botões para melhorar o *feedback* interativo.
- **Estabilização de Estado**: Correção do fluxo de `onChooseMode` para garantir que o estado de visualização (`isViewingMode`) seja corretamente definido antes da renderização do universo.

### Correções de Bugs
- Corrigido travamento dos botões da Home que impediam o acesso ao modo ADM.
- Corrigido conflito de renderização que causava a exibição de duas constelações simultaneamente.

---

## [1.3.0] - 2026-05-19

### Alterado
- **Isolamento de Estado de Fábrica:** Limpeza completa do array de memórias no ficheiro `universe.config.js` para garantir que o Modo Criador inicie sempre com o céu 100% zerado após um reload.
- **Fluxo de Hidratação de Dados:** Refatoração do ciclo de vida no `App.jsx` para discernir com precisão entre o ambiente de criação limpo (sem parâmetros na URL) e o ambiente de visualização do presenteado (hidratado via Base64 na URL).

### Adicionado
- **Documentação de Evolução (`CHANGELOG.md`):** Criação deste arquivo para registrar de forma transparente o histórico de engenharia, refatorações e marcos técnicos do projeto.

---

## [1.2.0] - 2026-05-19

### Adicionado
- **Documentação de Evolução (`CHANGELOG.md`):** Criação deste arquivo para registrar de forma transparente o histórico de engenharia, refatorações e marcos técnicos do projeto.

---

## [1.1.0] - 2026-05-19

### Adicionado
- **Arquitetura Serverless Dinâmica:** Implementação de persistência e tráfego de dados via cliente através da codificação do banco de memórias em string Base64 segura anexada aos parâmetros da URL (`?u=`).
- **Modo Criador Visual:** Adicionada escuta de eventos de clique no plano de fundo do componente `Universe.jsx`, calculando automaticamente as coordenadas matemáticas (`top` e `left` em porcentagem) para criação dinâmica de novas estrelas.
- **Painel Administrativo (`.admin-panel`):** Menu inferior discreto para gerenciamento do fluxo do criador, com geração de link em tempo real e cópia automática para a área de transferência (`navigator.clipboard`).
- **Componente `MemoryModal.jsx`:** Criação de um card flutuante centralizado para leitura de textos e datas, utilizando efeito de desfoque de fundo de alta fidelidade visual (`backdrop-filter: blur(8px)`).
- **Tratamento de Erros de Execução:** Lógica com blocos `try/catch` no ciclo de efeito inicial (`useEffect`) do `App.jsx` para garantir o carregamento do estado padrão (`DEFAULT_UNIVERSE`) caso parâmetros corrompidos sejam injetados na URL.

### Corrigido
- **Fidelidade Anatômica da Constelação:** Substituição da estrutura geométrica genérica anterior por um mapeamento vetorial SVG rigoroso que representa os nós e vértices reais das 5 estrelas principais de Câncer (*Acubens, Altarf, Asellus Australis, Asellus Borealis* e *Tegmine*).
- **Orquestração de Animações CSS/React:** Resolução do bug de renderização inorgânica onde a constelação apenas piscava ("pop-upando"). Corrigido aplicando uma `key` dinâmica baseada em timestamp (`Date.now()`) no elemento SVG, forçando o navegador a resetar o estado físico e desenhar a constelação suavemente (`stroke-dashoffset`) a cada reposicionamento.
- **Resolução de Imports e Cache do Vite:** Correção de erros críticos em cascata de análise de módulos (`[plugin:vite:import-analysis]`) através da padronização de caminhos e declaração explícita de extensões de arquivos (`.jsx` e `.js`) nas diretivas de importação.
- **Consistência de Variáveis:** Alinhamento de nomenclatura de objetos e propriedades entre o arquivo central de configuração (`universe.config.js`) e as views de consumo (`Home.jsx` e `Universe.jsx`).

---

## [1.0.0] - 2026-05-18

### Adicionado
- **Camada de Entrada (`Home.jsx`):** Criação da interface inicial com tipografia elegante, centralização absoluta e transição de telas via manipulação de estados do React.
- **Sistema de Partículas de Fundo (`BackgroundStars.jsx`):** Camada estática simulando um céu estrelado profundo distribuído de forma pseudo-aleatória.
- **Interatividade de Cursor (`CometTrail.jsx`):** Efeito cinemático de rastro luminoso que persegue o movimento do ponteiro do mouse na tela utilizando coordenadas em tempo real.
- **Estilização Base:** Configuração de resets globais de layout, paleta de cores voltada para tons escuros espaciais e tipografias minimalistas no `index.css`.