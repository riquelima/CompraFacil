# Implementar Sugestões de Receitas Baseadas em Estoque

## Objetivos
1.  **Expandir Banco de Receitas**: Adicionar mais 5-6 receitas estáticas no `js/app.js` (Omelete, Macarrão, Frango, Salada, Brigadeiro) que utilizem ingredientes comuns.
2.  **Lógica de "Match" de Estoque**: Criar uma função que compara os ingredientes de cada receita com o estoque do usuário (buscado do Supabase) e calcula a porcentagem de compatibilidade.
3.  **Filtragem Avançada**: Implementar os filtros solicitados (Tempo, Dificuldade, Categoria) na interface e na lógica de renderização.
4.  **Interface de Sugestões**: Atualizar o `assistente.html` para exibir essas receitas de forma responsiva e destacar as que têm >80% de match com o estoque.

## Passos de Implementação
1.  **Atualizar `js/app.js`**:
    *   Expandir o objeto `recipes` com as novas receitas.
    *   Criar função `fetchUserStock()` para obter lista de ingredientes do usuário.
    *   Criar função `calculateStockMatch(recipe, stock)` que retorna a %.
    *   Atualizar `initAssistant` para carregar o estoque e depois renderizar os cards ordenados por match.
    *   Implementar lógica de filtragem (`filterRecipes()`) que considera Tempo, Dificuldade e Categoria.
2.  **Atualizar `assistente.html`**:
    *   Adicionar novos controles de filtro (Dropdowns ou botões para Tempo e Dificuldade).
    *   Manter o grid responsivo já existente.
3.  **Renderização**:
    *   Atualizar a função de criação de card para mostrar um selo "X% dos ingredientes disponíveis" se for alto.

## Receitas a Adicionar
*   **Omelete de Queijo** (Ovo, Queijo, Sal)
*   **Macarrão Alho e Óleo** (Macarrão, Alho, Azeite)
*   **Frango com Batata** (Frango, Batata, Sal)
*   **Salada Caesar Simples** (Alface, Frango, Pão, Queijo)
*   **Brigadeiro de Colher** (Leite Condensado, Cacau, Manteiga)
*   **Arroz com Ovo** (Arroz, Ovo, Sal, Óleo)

## Critérios de Aceite
*   Novos cards aparecem na tela.
*   Filtros funcionam corretamente.
*   Receitas são sugeridas com base no estoque (simulado ou real se houver dados).
