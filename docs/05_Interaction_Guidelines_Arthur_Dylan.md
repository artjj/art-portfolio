# 05_Interaction_Guidelines.md

# Interaction Guidelines — Portfólio Artístico | ART

## Interaction Manifesto

As interações existem para destacar a arte, nunca para competir com ela.

O movimento deve conduzir o olhar do visitante, reforçar a narrativa e tornar a experiência agradável, mantendo a navegação extremamente responsiva.

---

# 1. Interaction Philosophy

## Princípios

- Interface extremamente responsiva.
- Conteúdo acima das animações.
- Movimento com propósito.
- Interações naturais.
- Toda interação deve parecer física.

## Scroll

- Levemente suavizado.
- Nunca pesado.
- Mantém sensação natural.

## Motion Budget

Cada seção pode possuir apenas um elemento principal em movimento.

Exemplos:

Hero
- Vídeo em movimento.
- Texto entra apenas uma vez.

Galeria
- Preview dos vídeos.
- Cards permanecem discretos.

Filosofia
- Foto com leve parallax.
- Texto estático.

---

# 2. Hero Interactions

## Entrada

- Fade inicial entre 500ms e 800ms.
- Reprodução automática.
- Loop infinito.
- Sem áudio.

## Controles

- Não permitir pausa.
- Hero funciona como ambientação.

## Scroll

- Leve efeito de parallax.
- Conteúdo permanece legível.

## Fallback

Caso o autoplay seja bloqueado:

- Exibir frame do vídeo.
- Manter toda a identidade visual.

---

# 3. Gallery & Video Interactions

## Hover

- Preview automático.
- Zoom discreto.
- Exibição de título e contexto.

## Modal

- Entrada cinematográfica.
- Fundo escurecido.
- Blur sutil.

## Fechamento

- Clique fora.
- ESC.
- Botão fechar.

## Navegação

Desktop

- Setas.
- Teclado (← →).

Mobile

- Swipe horizontal.
- Botões discretos.

---

# 4. Progressive Disclosure

O conteúdo deve ser revelado em camadas.

Fluxo:

1. Vídeo.
2. Contexto.
3. Modal.
4. Informações completas.

A interface nunca apresenta todas as informações ao mesmo tempo.

---

# 5. Microinteractions

## Botões

- Elevação discreta.
- Brilho sutil.
- Feedback imediato.

## Cards

- Zoom leve.
- Brilho discreto na borda.

## Links

- Sublinhado animado.

## Formulários

- Glow discreto ao foco.
- Validação elegante.

---

# 6. Feedback

Toda interação deve responder em menos de 100ms.

Inclui:

- Hover
- Clique
- Navegação
- Envio de formulário
- Troca de idioma
- Troca de tema

---

# 7. Interface States

## Loading

- Minimalista.
- Apenas quando necessário.

## Imagens

- Blur progressivo.

## Vídeos

Em caso de erro:

- Thumbnail.
- Botão para YouTube.

## Formulário

Após envio:

- Pequena animação.
- Mensagem elegante.
- Possibilidade de novo envio.

---

# 8. Graceful Degradation

Caso algum recurso não esteja disponível:

- Interface permanece bonita.
- Conteúdo continua acessível.
- Navegação continua funcional.

Nunca depender exclusivamente de:

- Autoplay.
- Cursor personalizado.
- Parallax.
- APIs modernas.

---

# 9. Accessibility & Inclusive Design

## Navegação

- Navegação completa por teclado.
- Ordem lógica de foco.
- Indicador de foco visível.

## Movimento

Respeitar:

prefers-reduced-motion

Quando ativo:

- Reduzir animações.
- Remover parallax.
- Preservar funcionalidade.

## Contraste

Todos os textos devem atender WCAG AA.

## Tipografia

- Legível.
- Bom line-height.
- Boa leitura em todos os dispositivos.

## Imagens

- Texto alternativo.
- Imagens decorativas ignoradas.

## Vídeos

- Legendas quando possível.
- Controles acessíveis.
- Fallback disponível.

## Formulários

- Labels.
- Mensagens claras.
- Estados acessíveis.

## Mobile

Áreas de toque:

44x44 px mínimo.

## Idiomas

Mesmo comportamento em:

- Português
- Inglês

## Compatibilidade

- Chrome
- Edge
- Safari
- Firefox

Desktop, notebook, tablet e smartphone.

---

# 10. Quality First

Toda funcionalidade adicionada ao projeto deve melhorar pelo menos um dos pilares:

- Experiência do usuário
- Clareza do conteúdo
- Performance
- Acessibilidade
- Manutenibilidade

Caso não melhore nenhum deles, não deve ser implementada.

---

# Interaction Principles

- O conteúdo é protagonista.
- A dança é o centro da experiência.
- O design conduz.
- As animações apoiam.
- A interface nunca compete com a arte.