# Plano de Correção: Autenticação, Loop e Dados Incorretos

## Diagnóstico
1.  **Redirecionamento Incorreto / Dados Fixos:**
    - O usuário relatou que está sendo redirecionado para "pedro@exemplo.com".
    - **Causa:** O arquivo `configuracoes.html` contém HTML estático com "Pedro Silva" e "pedro@exemplo.com" como placeholder.
    - **Problema:** Se o JavaScript falhar ou demorar para carregar os dados reais do Supabase, o usuário vê esses dados falsos, criando a ilusão de estar na conta errada.
    - **Ação:** Remover os dados hardcoded do HTML e substituí-los por "Carregando..." ou esqueletos vazios para evitar confusão.

2.  **Loop de Carregamento Infinito:**
    - O usuário relatou tela de carregamento travada.
    - **Causa Potencial:** A função `initHome` (e outras) pode estar falhando silenciosamente ou o Supabase pode não estar retornando a sessão corretamente, mantendo o `#loadingState` visível para sempre.
    - **Ação:** Reforçar o tratamento de erro em `initHome` para garantir que o `#loadingState` seja ocultado (`classList.add('hidden')`) mesmo se ocorrer um erro crítico (bloco `finally`).

3.  **Log de Autenticação:**
    - O sistema carece de logs visíveis em produção para diagnosticar por que a sessão pode estar falhando.
    - **Ação:** Adicionar logs detalhados no console (mesmo em produção temporariamente) para rastrear o objeto `session` retornado pelo Supabase.

## Plano de Execução

### 1. Higienização do HTML (`configuracoes.html`)
- **Objetivo:** Remover "Pedro Silva" e "pedro@exemplo.com".
- **Alteração:** Substituir por `...` ou `Carregando...` no HTML estático. Isso elimina a percepção de "conta errada" enquanto os dados reais carregam.

### 2. Reforço no `js/app.js` (Correção do Loop)
- **Objetivo:** Garantir que o loader desapareça.
- **Alteração em `initHome`:**
    - Adicionar bloco `finally` robusto que força a remoção de `loadingState` e a exibição de `mainContent`.
    - Adicionar verificação explícita: se `session.user` for nulo, redirecionar para login *antes* de tentar renderizar qualquer coisa.

### 3. Melhoria na Busca de Perfil (`initSettings`)
- **Objetivo:** Garantir que os dados do usuário real (Henrique) sejam exibidos.
- **Alteração:**
    - Adicionar log: `console.log('User metadata:', session.user.user_metadata)`.
    - Melhorar a lógica de fallback: Se não houver perfil na tabela `profiles`, usar estritamente `session.user.email` e `session.user.user_metadata.full_name` para preencher a tela.

### 4. Validação
- Testar o fluxo de login -> home -> configurações.
- Verificar se o nome "Henrique" aparece corretamente.
- Verificar se o loader some mesmo em caso de erro de rede (simulado).
