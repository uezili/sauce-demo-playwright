# Sauce Demo Playwright Automation

![CI](https://github.com/uezili/sauce-demo-playwright/actions/workflows/playwright.yml/badge.svg)

Conjunto de testes automatizados para o site **Sauce Labs Demo** usando [Playwright](https://playwright.dev/) + JavaScript.  
Este projeto abrange testes de interface do usuário de ponta a ponta, incluindo fluxos de login, inventário, carrinho e checkout.

---

Estrutura do Repositório

```text
sauce-demo-playwright/
├── fixtures/                 # Dados de teste (login, produtos, etc.)
├── pages/                    # Page Objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
├── tests/                    # Arquivos de testes automatizados
├── utils/                    # Helpers / Factories de dados de formulário, funções auxiliares
├── package.json
├── playwright.config.js      # Configurações do Playwright
└── README.md
```

## Execução dos Testes

### 1. Clonar o repositório
```bash
  git clone https://github.com/uezili/sauce-demo-playwright.git
  cd sauce-demo-playwright
```
### 2. Instalar dependências
```bash
  npm install
```
### 3. Como executar os testes
```bash
  npx playwright test
```
### 4. Executar um arquivo de teste específico
```bash
  npx playwright test tests/checkout.spec.js
```

### 5. Execução com interface grafica
```bash
  npx playwright test --ui
```

### 6. Executar smoke/regression por tags
```bash
# smoke
npm run test:smoke

# regression
npm run test:regression
```

### 7. Executar testes de acessibilidade (axe)
```bash
npx playwright test tests/accessibility.spec.js
```

### 8. Lint e format
```bash
# checar lint
npm run lint

# corrigir automaticamente
npm run lint:fix

# formatar com Prettier
npm run format
```
## Principais cenários de teste cobertos

- Login válido e inválido
- Listagem de produtos no inventory
- Adicionar/remover produtos no carrinho
- Checkout completo com informações válidas
- Validação de campos obrigatórios no checkout
- Cálculo de totais, incluindo impostos
- Cancelar fluxo de checkout em diferentes etapas

## Boas práticas implementadas

- Page Object Model (POM) para separar responsabilidades de página/lógica de teste.
- Fixtures e Factories para gerenciar dados de teste.
- Hooks (beforeEach / afterEach) para setup/teardown e captura de screenshot em falhas.
- CI (GitHub Actions) executando testes em PRs e publicando relatórios como artefatos.
- Checks de acessibilidade (axe) para páginas-chave.

## Tecnologias

- Node.js
- Playwright
- JavaScript
- Fixtures / Factories para dados de teste

## Relatórios

- HTML report padrão do Playwright: gerado em `playwright-report`.
  - Abrir localmente: `npm run report` ou `npx playwright show-report`.
- Allure report: resultados em `allure-results` (gerado via `allure-playwright`).
  - Servir localmente: `npm run report:allure`.

## Integração Contínua (CI)

Um workflow do GitHub Actions (`.github/workflows/playwright.yml`) instala dependências, baixa browsers do Playwright, executa os testes e publica os artefatos:

- `playwright-report`: relatório HTML do Playwright.
- `allure-results`: resultados para consumo do Allure.

Os testes também podem usar a variável `BASE_URL` (por padrão `https://www.saucedemo.com/`).
