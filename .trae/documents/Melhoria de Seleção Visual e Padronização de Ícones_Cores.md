# Plano de Melhoria Visual e Funcional (Seleção e Criação de Listas)

## Diagnóstico
Atualmente, a seleção de ícones e cores em `novalista.html` utiliza estilos CSS simples (`css/styles.css`). A solicitação exige melhorias visuais específicas (bordas verdes em seleção), expansão da paleta de cores e padronização rigorosa dos ícones entre a seleção e a exibição final nas listas (`usuario.html` e `lista.html`).

## Objetivos
1.  **Feedback Visual de Seleção**: Alterar o estilo de seleção para uma borda verde (#00FF00) de 2px com transição suave.
2.  **Expansão da Paleta de Cores**: Adicionar Vermelho e Cinza à paleta existente, totalizando 8 opções, e garantir que essas cores sejam aplicáveis em todo o sistema.
3.  **Padronização de Ícones**: Garantir que o ícone escolhido seja renderizado com fidelidade visual (tamanho, proporção) em todas as telas, tratando casos de falha de carregamento.

## Etapas de Implementação

### 1. Estilização CSS (`css/styles.css`)
*   **Atualizar `.icon-radio:checked+div`**: Modificar a propriedade `box-shadow` ou `border` para utilizar a cor `#00FF00` e espessura de 2px. Adicionar `transition: border 0.3s ease, box-shadow 0.3s ease`.
*   **Atualizar `.color-radio:checked+div`**: Aplicar o mesmo padrão de seleção visual (borda verde) para consistência, ou manter o estilo de "anel" mas com a cor de destaque solicitada se fizer sentido, mas o foco é a acessibilidade e visibilidade.
*   **Classes de Cores**: Verificar se as classes para as novas cores (`nb-red`, `nb-gray`) existem na configuração do Tailwind no `head` dos arquivos HTML ou se precisam ser adicionadas via CSS personalizado se o Tailwind for CDN. Como visto em `novalista.html`, o Tailwind é configurado via script no `head`.

### 2. Atualização da Configuração Tailwind (HTMLs)
*   **Arquivos**: `novalista.html`, `usuario.html`, `lista.html`, `inventario.html`, `configuracoes.html`, `assistente.html`, `receita.html`.
*   **Ação**: Adicionar as cores `nb-red` (#FF5252 ou similar vibrante) e `nb-gray` (#9CA3AF) ao objeto `tailwind.config` dentro da tag `<script id="tailwind-config">`.

### 3. Modificação da Interface de Seleção (`novalista.html`)
*   **Paleta de Cores**: Adicionar os novos inputs de rádio para "Vermelho" e "Cinza" no formulário de criação.
*   **Ícones**: Garantir que o HTML da seleção de ícones use classes que forcem a proporção e o ajuste da imagem (`object-contain`, dimensões fixas) idênticas às usadas na visualização do card.

### 4. Lógica de Renderização e Validação (`js/app.js`)
*   **Mapeamento de Cores (`initHome`)**: Atualizar o objeto `colorMap` dentro da função `initHome` (e onde mais for usado) para incluir `nb-red` e `nb-gray`, mapeando-as para as classes de fundo corretas (`bg-nb-red`, `bg-nb-gray`).
*   **Renderização de Ícones**:
    *   Criar uma função auxiliar `renderIcon(iconUrl, sizeClass)` que retorna o HTML da imagem com tratamento de erro (`onerror="this.src='fallback_icon_url'"`) e classes padronizadas.
    *   Substituir a lógica ad-hoc em `initHome` e `initListDetail` por esta função auxiliar.
*   **Validação**: No `initNewList`, verificar se o ícone e a cor foram selecionados antes de enviar.

## Verificação
1.  Criar uma nova lista escolhendo a cor "Vermelho" e um ícone específico.
2.  Verificar se a borda de seleção ficou verde (#00FF00) durante a escolha.
3.  Confirmar se a lista aparece em `usuario.html` com o fundo vermelho e o ícone correto.
4.  Entrar na lista (`lista.html`) e verificar se o ícone e a cor persistem no cabeçalho/detalhes.
