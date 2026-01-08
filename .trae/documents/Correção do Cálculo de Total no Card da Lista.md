# Plano de Correção do Total no Card da Lista

## 1. Diagnóstico do Problema
-   O usuário reportou que o valor total ("R$ 0,00") exibido no card da lista na tela inicial (`usuario.html`) não está refletindo o valor real dos itens da lista.
-   Apesar da refatoração anterior para `async/await` garantir a sincronização com o banco, é possível que:
    1.  A lógica de cálculo (`calculateTotals`) esteja somando incorretamente (ex: apenas itens checados vs todos os itens com preço).
    2.  O valor `total_amount` no banco de dados não esteja sendo atualizado corretamente.
    3.  A renderização do card na `initHome` esteja usando um valor desatualizado ou formatando incorretamente.

## 2. Ação Corretiva em `js/app.js`
-   **Revisar `calculateTotals`**: Verificar se a soma deve considerar todos os itens com preço ou apenas os marcados. Geralmente, em listas de compras, o "Total Estimado" deve somar **todos** os itens que têm preço definido, para dar uma previsão de gasto. Se a lógica atual soma apenas os marcados (`if (i.is_checked)`), isso explica por que o total aparece zerado (ou baixo) se nada estiver marcado.
-   **Ajuste de Lógica**: Alterar o loop de soma para incluir `i.price` independentemente de `i.is_checked`, ou criar duas métricas (Total Estimado vs Total no Carrinho). Para o card da home, o "Total" geralmente se refere ao valor total da lista planejada.
-   **Verificação na `initHome`**: Garantir que o valor `list.total_amount` vindo do Supabase está sendo formatado corretamente.

## 3. Implementação
-   Modificar `calculateTotals` para somar o preço de **todos** os itens da lista que possuem valor, não apenas os marcados.
-   Testar a atualização entrando em uma lista, editando um preço e voltando para a home.

## 4. Validação
-   Confirmar se o valor no card da home atualiza para refletir a soma dos preços dos itens.
