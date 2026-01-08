# Correção de Logout Imediato no Carregamento da Página

## Diagnóstico
-   **Cenário**: O usuário faz login ou cadastro. A função `navigate('usuario.html')` é chamada.
-   **Problema**: Como a página `login.html` não possui a estrutura de SPA completa (`#main-content`), a função `navigate` faz um fallback para `window.location.href = ...`, recarregando a página totalmente.
-   **Causa Raiz**: Ao carregar `usuario.html`, o evento `DOMContentLoaded` do `app.js` é disparado. Ele verifica se a persistência de sessão está desligada (`keepSession = false`) e se existe uma sessão ativa. Se sim, ele assume que é uma sessão "velha" e faz logout (`signOut`).
-   **Falha**: O código atual do `DOMContentLoaded` **não verifica** a flag `app_session_initialized` que definimos no passo anterior. Portanto, ele mata a sessão legítima que acabamos de criar, redirecionando o usuário de volta para a home.

## Solução
Atualizar a lógica dentro de `document.addEventListener('DOMContentLoaded', ...)` em `js/app.js` para respeitar a flag de sessão inicializada.

```javascript
    // Strict Session Check on Load
    const keepSession = localStorage.getItem('keep_session_active') === 'true';
    const sessionInitialized = sessionStorage.getItem('app_session_initialized'); // CHECK THIS

    if (!keepSession && !sessionInitialized && window.supabaseClient) { // ADD CHECK HERE
         // ... logic to kill session
    }
```

Isso garantirá que, se viermos de um login recente (que define essa flag), o `app.js` não destruirá a sessão.
