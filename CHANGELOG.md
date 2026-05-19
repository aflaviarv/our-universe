# Changelog

Acompanhamento detalhado de todas as alterações, correções e evolução da arquitetura do projeto **Our Universe**. O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

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