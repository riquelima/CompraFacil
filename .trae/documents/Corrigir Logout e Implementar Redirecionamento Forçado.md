# Corrigir Logout no Vercel

## Análise do Problema
O usuário relata que o logout não funciona após o deploy no Vercel.
Possíveis causas:
1.  **Escopo da Função**: A função `handleLogout` pode não estar globalmente acessível (`window.handleLogout`) ou pode estar sendo sobrescrita.
2.  **Erro de Execução**: O `confirm` pode estar bloqueado ou o `signOut` do Supabase falhando silenciosamente.
3.  **Redirecionamento SPA**: A função `navigate('login.html')` após o logout pode estar falhando se o Supabase demorar para limpar a sessão local.
4.  **Binding no HTML**: O botão em `configuracoes.html` pode estar com a sintaxe errada no `onclick` ou o evento não está propagando.

No log anterior, vimos um erro `net::ERR_ABORTED` na chamada de logout do Supabase. Isso pode indicar problema de CORS ou configuração de URL do Supabase, mas também pode ser apenas uma interrupção de rede.

## Plano de Ação
1.  **Reforçar `handleLogout`**:
    *   Garantir que ela esteja explicitamente no `window`.
    *   Adicionar logs de depuração antes e depois da chamada do Supabase.
    *   Forçar redirecionamento via `window.location.href` em vez de `navigate` para garantir limpeza total do estado da aplicação.
2.  **Verificar HTML**: Confirmar se o `onclick` está chamando `window.handleLogout()`.
3.  **Tratamento de Erro**: Adicionar `try/catch` ao logout para alertar o usuário se houver falha na API.

## Passos
1.  Atualizar `js/app.js`: Reescrever `window.handleLogout` com logs e redirecionamento forçado.
2.  Verificar `configuracoes.html` (já corrigido anteriormente, mas confirmar).
3.  Commit e Push.
