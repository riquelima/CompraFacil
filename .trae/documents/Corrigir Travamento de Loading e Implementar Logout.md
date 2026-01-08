# Diagnóstico e Solução para Erros de Supabase e Logout

## Problemas Identificados
1.  **Carregamento Infinito (Fetch Supabase)**: Mesmo com a verificação de inicialização, a tela ainda trava em "Carregando...".
    *   **Causa provável**: O `listsGrid` pode não estar sendo encontrado corretamente no DOM no momento que `initHome` roda, ou o erro do Supabase está sendo silenciado/não tratado corretamente no `catch`. Além disso, a verificação `if (!listsGrid)` retorna sem remover o loading se o elemento não existir, o que causa o travamento visual.
    *   **Solução**: Garantir que o `loadingState` seja ocultado *sempre* no bloco `finally`, independentemente de encontrar o grid ou ter erro de auth. Adicionar retry logic ou mensagem de erro explícita na UI se a conexão falhar.

2.  **Logout em Configurações**: O botão de sair precisa funcionar.
    *   **Causa provável**: A função `handleLogout` pode não estar vinculada ao evento de clique do botão no HTML de `configuracoes.html` ou a função não está acessível globalmente da maneira correta.
    *   **Solução**: Verificar `configuracoes.html` e garantir que o botão chama `window.handleLogout()`.

## Plano de Execução
1.  **Reforçar `initHome` em `js/app.js`**:
    *   Remover o `return` prematuro quando `listsGrid` não é encontrado (isso impede que o loading suma).
    *   Se `listsGrid` não existir, logar erro mas limpar o loading.
    *   Adicionar timeout de segurança para forçar a remoção do loading após 5 segundos se nada acontecer.
2.  **Corrigir `configuracoes.html`**:
    *   Verificar o botão de sair e adicionar `onclick="handleLogout()"`.
3.  **Verificar Credenciais Supabase**:
    *   Ler `js/supabase-config.js` para garantir que a inicialização está correta.

## Passos
1.  Ler `js/supabase-config.js` e `configuracoes.html`.
2.  Editar `js/app.js` para tornar `initHome` à prova de falhas (sempre remover loading).
3.  Editar `configuracoes.html` para vincular o logout.
4.  Testar e fazer push.
