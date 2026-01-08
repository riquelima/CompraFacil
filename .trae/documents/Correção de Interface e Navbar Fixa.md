# Plano de Correção e Melhoria da Interface

## Diagnóstico
1.  **Fundo com "Pontos"**: O padrão de pontos (dot pattern) está definido no `body` via CSS. A interface está "perdendo" sua cor de fundo sólida (`bg-nb-bg`), fazendo com que o padrão do body apareça através dos elementos transparentes.
2.  **Navbar Recarregando**: A barra de navegação está dentro do container `#app-content`, que é substituído a cada navegação. Isso causa recarregamentos desnecessários e perda de estado visual.
3.  **Tratamento de Erros**: Falta feedback visual claro para o usuário quando o carregamento falha.

## Solução Proposta

### 1. Fixação da Navbar (SPA Shell)
Moveremos a estrutura HTML da Navbar para **fora** do container `#app-content` em todas as páginas principais. Isso tornará a Navbar um elemento persistente que não é afetado pela troca de conteúdo dinâmico.

*   **Arquivos Afetados**: `usuario.html`, `inventario.html`, `lista.html`, `novalista.html`, `assistente.html`, `receita.html`.
*   **Ação**: Mover a `div` com classe `fixed bottom-0` para ser irmã de `#app-content`.
*   **Ajuste de Layout**: Adicionar padding inferior (`pb-24`) ao container de conteúdo para evitar que a Navbar fixa cubra o final da lista.

### 2. Correção do Fundo (Background)
Forçaremos a aplicação da cor de fundo sólida no container principal da aplicação para cobrir o padrão de pontos do `body`.

*   **Arquivos Afetados**: `usuario.html` e demais páginas.
*   **Ação**: Adicionar/Reforçar as classes `bg-nb-bg relative z-10` no container principal (`div` wrapper).
*   **CSS**: Verificar e garantir que `bg-nb-bg` tenha prioridade sobre o background transparente.

### 3. Tratamento de Erros Visual
Implementaremos um sistema simples de notificação (Toast) para alertar o usuário sobre falhas.

*   **Arquivo**: `js/app.js`
*   **Ação**: Criar função `showToast(message, type)` e integrá-la aos blocos `catch` de carregamento (`loadPageContent`, `initHome`, etc.).

### 4. Testes de Responsividade
Garantir que as alterações de layout (Navbar fixa e Paddings) funcionem bem em mobile e desktop, ajustando as classes Tailwind conforme necessário (`md:max-w-2xl`).

## Etapas de Implementação
1.  **Refatorar Estrutura HTML**: Mover Navbar para fora de `#app-content` em todos os arquivos HTML.
2.  **Aplicar Correção de Fundo**: Adicionar classes de background e z-index ao wrapper principal.
3.  **Atualizar Lógica JS**: Implementar Toast de erro e verificar se a navegação SPA ignora corretamente a Navbar fixa.
4.  **Validação**: Verificar se a navegação ocorre sem "piscar" a navbar e se o fundo permanece sólido.