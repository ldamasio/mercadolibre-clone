# Responsive Visibility com Tailwind CSS 

Responsive Visibility com Tailwind CSS é o padrao adotado no protótipo do Mercado Libre.

Este guia mostra como usar arbitrary variants do Tailwind CSS para renderizar elementos apenas em tamanhos específicos de tela, sem necessidade de configurar classes adicionais no tailwind.config.js.

## Requisitos

Tailwind CSS v3.2+ em modo JIT (padrão)

## Mobile-only (telas até 720px)

Use `hidden` + `max-[720px]:block`:

  <div class="hidden max-[720px]:block">
    <!-- Este conteúdo aparece apenas em telas com largura ≤ 720px -->
    Conteúdo mobile-only
  </div>

`hidden`: esconde o elemento por padrão.

`max-[720px]:block`: aplica display: block em @media (max-width: 720px).

## Desktop-only (telas maiores que 720px)

Use `block` + `max-[720px]:hidden`:

  <div class="block max-[720px]:hidden">
    <!-- Este conteúdo aparece apenas em telas com largura > 720px -->
    Conteúdo desktop-only
  </div>

`block`: exibe o elemento por padrão.

`max-[720px]:hidden`: aplica `display: none` em `@media (max-width: 720px)`.

## Observações

Os valores do breakpoint (720px) podem ser ajustados conforme necessidade.
Você também pode usar outras propriedades (e.g., `flex`, `inline-block`) em vez de block.
Essa abordagem é totalmente inline e dispensa alterações em arquivos de configuração.

---

Documentação gerada em 2025-07-09

