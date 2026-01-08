# Diagnóstico e Resolução de Erros Críticos

## Análise dos Logs
1.  **"Critical elements missing for Home"**: `initHome` falha porque `listsGrid` ou `loadingState` não são encontrados. Isso sugere que o script está rodando *antes* do DOM da Home (`usuario.html`) estar totalmente injetado ou renderizado, ou que estamos tentando rodar lógica da Home em outra página.
2.  **"No #app-content found in target page"**: Erro grave de navegação SPA. A função `loadPageContent` busca o elemento `#app-content` na página alvo para fazer o swap, mas não o encontra. Isso significa que alguma página (`usuario.html`, `login.html`, etc.) pode não ter a estrutura correta com `<div id="app-content">`.
3.  **Erro de Fetch (Fonts/Supabase)**: Erros de rede (`net::ERR_ABORTED`). Para o Supabase, falha no logout. Para fontes, falha no carregamento do arquivo woff2.

## Plano de Ação
1.  **Verificar Estrutura HTML**: Confirmar se TODAS as páginas (`index.html`, `usuario.html`, `login.html`, etc.) possuem o wrapper `<div id="app-content">`. A falta disso quebra a SPA.
2.  **Refinar `initPageLogic`**: Adicionar verificação mais robusta para garantir que `initHome` só rode se estivermos de fato na estrutura correta.
3.  **Tratar Erro de Navegação**: Se `#app-content` não for encontrado, forçar um `window.location.reload()` completo como fallback definitivo, em vez de deixar a página em estado quebrado.
4.  **Verificar Login/Logout**: O erro de logout sugere problema de conexão ou sessão inválida.

## Passos
1.  Ler `usuario.html` e `login.html` para checar `#app-content`.
2.  Corrigir HTMLs faltantes.
3.  Atualizar `js/app.js` para melhorar o fallback de navegação.
4.  Push das correções.
