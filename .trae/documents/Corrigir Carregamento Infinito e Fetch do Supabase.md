# Corrigir Carregamento de Dados (Supabase/SPA)

## Diagnóstico
O usuário reporta que os dados não carregam, ficando na tela de "Carregando...". Isso geralmente ocorre quando a inicialização da lógica da página (`initPageLogic` / `initHome`) falha ou não é chamada corretamente após a navegação ou recarregamento, especialmente em arquiteturas SPA onde o DOM é substituído.

Possíveis causas:
1.  **Ordem de Scripts**: `app.js` pode estar rodando antes de `supabase-config.js` estar pronto.
2.  **Inicialização SPA**: Quando a página é carregada diretamente (ex: `usuario.html`), o evento `DOMContentLoaded` dispara `initPageLogic`. Se o cliente Supabase não estiver pronto, falha.
3.  **Seleção de Elementos**: `initHome` tenta selecionar `listsGrid`. Se o HTML ainda não foi parseado ou injetado corretamente, falha.

## Plano de Ação
1.  **Verificar Inicialização**: Garantir que `initPageLogic` aguarde a disponibilidade de `window.supabaseClient`.
2.  **Depuração**: Adicionar logs em `initHome` para ver onde está travando (auth check, query, ou renderização).
3.  **Fallback de Auth**: Se não houver sessão, redirecionar explicitamente para login ou tratar o erro sem travar a UI.
4.  **Correção de `initHome`**: Verificar se os IDs `loadingState`, `mainContent`, `listsGrid` existem no momento da execução.

## Passos
1.  Adicionar verificação de `window.supabaseClient` no início de `initPageLogic`.
2.  Reforçar o tratamento de erro em `initHome` para garantir que o loading desapareça mesmo com erro.
3.  Testar o fluxo de carregamento.
4.  Commitar e dar push.
