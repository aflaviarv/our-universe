# Our Universe - Interactive Web Application

Uma Single Page Application (SPA) responsiva desenvolvida para entregar uma experiência visual interativa e personalizada. O projeto consolida princípios de componentização, gerenciamento de estado e separação de responsabilidades no front-end.

## Sobre o Projeto

O desenvolvimento deste aplicativo teve como objetivo principal a criação de uma interface dinâmica que renderiza dados estruturados em formato de elementos interativos (simulando um mapa estelar). 

A arquitetura foi projetada com foco em escalabilidade e privacidade de dados. A camada de visualização (UI) foi totalmente desacoplada da camada de dados. Isso permite que o repositório público consuma um mock de dados genérico, enquanto a infraestrutura permanece pronta para integrações futuras com APIs REST ou serviços de Backend-as-a-Service (BaaS), mantendo as informações de produção seguras e isoladas.

### Estudo de Caso (Metodologia STAR)

*   **Situação:** Necessidade de desenvolver uma plataforma web altamente customizável e acessível via múltiplos dispositivos para apresentar dados sequenciais de forma imersiva, superando as limitações estruturais de templates estáticos convencionais.
*   **Tarefa:** Arquitetar e implementar uma aplicação front-end responsiva (mobile-first) que garantisse alta performance de renderização visual, navegação fluida sem recarregamento de página e um ambiente de desenvolvimento otimizado.
*   **Ação:** Construção da interface utilizando React e Vite. Implementação de uma arquitetura baseada em componentes reutilizáveis e isolamento do escopo de dados. Desenvolvimento de estilização e animações utilizando CSS puro, minimizando a dependência de bibliotecas externas pesadas e otimizando o DOM virtual para transições de estado.
*   **Resultado:** Entrega de uma aplicação leve, de alta performance e manutenibilidade. O sistema apresenta layout adaptável a qualquer resolução de tela e um fluxo de gerenciamento de estado claro, evidenciando o domínio prático sobre frameworks JavaScript modernos e fundamentos de UI/UX.

## Arquitetura do Sistema

A base de código está organizada para maximizar a coesão e minimizar o acoplamento:

*   `src/components/`: Módulos de interface isolados (ex: renderizadores de pontos interativos e modais de exibição de dados).
*   `src/pages/`: Componentes estruturais de roteamento condicional que gerenciam a visualização principal.
*   `src/data/`: Diretório dedicado à consolidação e simulação do banco de dados local.

## Stack Tecnológica

*   **React:** Renderização declarativa e controle de ciclo de vida de componentes.
*   **Vite:** Build tool e servidor de desenvolvimento de alta velocidade.
*   **CSS3:** Estilização global com aplicação de flexbox, unidades relativas para responsividade nativa e controle de keyframes.
*   **JavaScript (ES6+):** Lógica de negócios e gerenciamento de estado assíncrono.

## Instruções de Execução

Para rodar o projeto em ambiente local de desenvolvimento, siga as diretrizes abaixo:

1. Clone o repositório em sua máquina:
   ```bash
   git clone [https://github.com/SEU_USUARIO/our-universe.git](https://github.com/SEU_USUARIO/our-universe.git)
   
```

2. Acesse o diretório raiz:
   ```bash
   cd our-universe
   
```

3. Instale os pacotes e dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento local:
   ```bash
   npm run dev
   ```