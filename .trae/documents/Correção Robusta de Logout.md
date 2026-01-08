# Plano de Correção de Logout (Erro de Rede Abortada)

## 1. Diagnóstico
-   O erro `net::ERR_ABORTED` na rota `/auth/v1/logout` indica que a requisição de logout foi interrompida ou falhou na rede.
-   Isso pode ocorrer se a página for redirecionada antes da conclusão da requisição ou se o cliente Supabase travar devido a instabilidade de conexão.
-   Para garantir que o usuário consiga sair mesmo com falhas de rede, precisamos forçar a limpeza local da sessão.

## 2. Solução Técnica (`js/app.js`)
-   **Timeout de Segurança**: Envolver a chamada `supabaseClient.auth.signOut()` em um `Promise.race` com um timeout curto (ex: 2000ms). Se o servidor não responder a tempo, prosseguimos com o logout local.
-   **Limpeza Local Forçada**: Adicionar lógica no bloco `finally` para varrer o `localStorage` e remover chaves que comecem com `sb-` e terminem com `-auth-token` (padrão do Supabase), além de limpar `app_session_initialized`.
-   **Redirecionamento**: Garantir que o `window.location.href = 'index.html'` ocorra sempre, independentemente do sucesso da requisição de rede.

## 3. Implementação
-   Modificar a função `window.handleLogout` em `js/app.js` com a nova lógica robusta.

## 4. Benefício
-   O usuário nunca ficará "preso" na tela de configurações se a API de autenticação estiver lenta ou inacessível. O logout visual e funcional será garantido.
