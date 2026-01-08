# Correção de Redirecionamento Pós-Cadastro/Login

## Problema
Após o cadastro (ou login), o usuário é redirecionado para a tela inicial, mas é deslogado imediatamente. Isso ocorre porque a função `navigate` em `js/app.js` possui uma verificação de segurança (`SESSION PERSISTENCE CHECK`) que roda na primeira navegação da sessão. Se a opção "Manter Sessão Ativa" estiver desligada (padrão), ela detecta a sessão existente (acabada de criar) e a encerra (`signOut`), assumindo que é uma sessão "fantasma" de um acesso anterior.

## Solução
Precisamos informar ao sistema que a sessão atual foi **explicitamente iniciada** pelo usuário nesta interação, evitando que a verificação de segurança a considere inválida.

## Implementação
1.  **Em `cadastro.html`**: No bloco de sucesso do `signUp`, definir `sessionStorage.setItem('app_session_initialized', 'true')` antes de chamar `navigate('usuario.html')`. Isso fará com que a função `navigate` pule a verificação de limpeza de sessão.
2.  **Em `login.html`**: Aplicar a mesma correção no bloco de sucesso do `signInWithPassword`, prevenindo o mesmo problema no fluxo de login.

Dessa forma, a verificação de segurança continuará protegendo contra sessões antigas ao abrir o app (ex: reabrir aba fechada), mas permitirá o fluxo normal de autenticação.
