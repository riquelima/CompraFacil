# Implementar Geração de Receitas com API Gemini

## Objetivos
1.  **Atualizar Chave da API**: Substituir a chave de API provisória pela chave fornecida (`AIzaSyDDOAkGR1y9OdVW5LK91TUz3oVYX78g-u8`) em `js/app.js`.
2.  **Verificar Lógica de Geração**: Garantir que a função `generateRecipe` solicite e processe corretamente o JSON da API Gemini, incluindo todos os campos necessários (título, categoria, tempo, calorias, proteína, dificuldade, ícone, ingredientes e passos).
3.  **Renderização do Card**: Assegurar que o card gerado dinamicamente siga exatamente o padrão visual (`article`) dos cards estáticos, permitindo o clique e navegação.
4.  **Detalhes da Receita**: Confirmar que a função `initRecipe` recupera os dados gerados (armazenados no `localStorage`) e popula corretamente todos os elementos da tela de detalhes (`h1`, `ul`, `div` de estatísticas, etc.).

## Passos de Implementação
1.  **Editar `js/app.js`**:
    *   Atualizar a constante `GEMINI_API_KEY`.
    *   Revisar o prompt na função `generateRecipe` para garantir robustez na resposta JSON.
    *   Verificar o parsing da resposta (tratamento de blocos de código markdown).
2.  **Validação**:
    *   Testar a geração de uma nova receita via input.
    *   Verificar se o card aparece na lista.
    *   Clicar no card e validar se todos os campos na tela de receita estão preenchidos corretamente.
