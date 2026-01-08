# Plano de Implementação de App Shell (Navbar e Header Fixos)

## Objetivo
Transformar a estrutura da aplicação para um modelo "App Shell" real, onde o Header (topo) e a Navbar (fundo) são elementos fixos no DOM que não recarregam. Apenas o conteúdo central (`main`) será atualizado dinamicamente.

## Mudanças Estruturais (HTML)

1.  **Padronização de IDs e Tags**:
    *   Renomear o container dinâmico atual `#app-content` para `#main-content` (ou usar a tag semanticamente correta `<main id="main-content">`).
    *   Garantir que `<header>` esteja fora desse container dinâmico, como irmão direto.
    *   Estrutura Alvo:
        ```html
        <div id="app-shell">
            <header id="app-header" class="fixed top-0 w-full z-50 ...">...</header>
            <main id="main-content" class="pt-24 pb-24 overflow-y-auto ...">...</main> <!-- Conteúdo Dinâmico -->
            <nav id="app-navbar" class="fixed bottom-0 ...">...</nav>
        </div>
        ```

2.  **Arquivos Afetados**:
    *   `usuario.html` (Converter div mainContent para tag `<main id="main-content">`)
    *   `inventario.html`, `lista.html`, `novalista.html`, `assistente.html`, `receita.html`, `configuracoes.html` (Ajustar hierarquia para mover header para fora do container dinâmico).

3.  **Estilização (CSS/Tailwind)**:
    *   Adicionar `pt-20` (ou valor adequado à altura do header) no `<main>` para evitar sobreposição.
    *   Garantir `z-index` correto: Navbar > Header > Main.

## Mudanças Lógicas (JavaScript - `js/app.js`)

1.  **Atualizar `loadPageContent(url)`**:
    *   **Parseamento Duplo**: Ao carregar uma nova página, o script deverá buscar e substituir **dois** alvos independentes:
        1.  `#app-header`: Substituir o `innerHTML` do header fixo pelo header da nova página.
        2.  `#main-content`: Substituir o `innerHTML` do main fixo pelo main da nova página.
    *   **Benefício**: O elemento `<header>` em si não é destruído, mantendo sua posição e propriedades "sticky/fixed" sem piscar, mas seu conteúdo (título, botões) é atualizado para corresponder à página atual.

2.  **Transições**:
    *   Aplicar animação de `fade` apenas no `#main-content`. O Header pode ter uma transição suave de opacidade ou troca instantânea.

## Etapas de Execução

1.  **Refatoração HTML**: Editar todos os arquivos HTML principais para adotar a estrutura "Shell" (Header irmão de Main).
2.  **Refatoração JS**: Reescrever `loadPageContent` para manipular Header e Main separadamente.
3.  **Verificação**: Testar navegação entre Home -> Inventário -> Nova Lista para garantir que o layout não quebra e o scroll interno funciona independentemente.