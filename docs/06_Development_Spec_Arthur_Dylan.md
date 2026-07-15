# 06_Development_Spec.md

# Development Specification --- ART Portfolio

## Objetivo

Definir a arquitetura técnica, stack e estratégia de implementação do
portfólio artístico do ART.

------------------------------------------------------------------------

# 1. Stack Tecnológica

-   Framework: Next.js (App Router)
-   Linguagem: TypeScript
-   Estilização: Tailwind CSS
-   Animações: Framer Motion
-   CMS: Sanity CMS

------------------------------------------------------------------------

# 2. Infraestrutura

-   Hospedagem: Vercel
-   Repositório: GitHub
-   CMS: Sanity Cloud
-   Domínio: Domínio próprio conectado à Vercel

------------------------------------------------------------------------

# 3. Arquitetura

Estrutura sugerida:

src/ ├── app/ ├── components/ ├── sections/ ├── lib/ ├── sanity/ ├──
styles/ ├── types/ └── i18n/

Princípios: - App Router - Componentização - Conteúdo desacoplado via
CMS - Internacionalização (PT/EN) - Tema claro/escuro

------------------------------------------------------------------------

# 4. CMS

Sanity CMS será utilizado para gerenciar:

-   Hero
-   Trabalhos
-   Vídeos
-   Galeria
-   Timeline
-   Filosofia
-   Contato

Objetivo: Atualizar conteúdo sem alterar código.

------------------------------------------------------------------------

# 5. Formulário

Tecnologias:

-   React Hook Form
-   Zod
-   Resend
-   Cloudflare Turnstile

Objetivos:

-   Validação robusta
-   Proteção contra spam
-   Envio por e-mail
-   Excelente UX

------------------------------------------------------------------------

# 6. SEO & Analytics

SEO

-   Metadata API (Next.js)
-   Sitemap
-   robots.txt
-   Open Graph
-   JSON-LD

Analytics

-   Vercel Analytics
-   Google Search Console

------------------------------------------------------------------------

# 7. Estratégia de Mídia

Imagens

-   next/image
-   AVIF / WebP
-   Lazy Loading

Vídeos

-   Hero otimizado
-   Previews leves
-   Vídeo completo via YouTube
-   Fallback estático quando necessário

------------------------------------------------------------------------

# 8. Qualidade

Ferramentas

-   ESLint
-   Prettier
-   Vitest
-   React Testing Library
-   Playwright

Métricas

-   Lighthouse Performance ≥ 90
-   Accessibility ≥ 95
-   Best Practices ≥ 95
-   SEO ≥ 95

Compatibilidade

-   Chrome
-   Edge
-   Firefox
-   Safari

------------------------------------------------------------------------

# 9. Plano de Implementação

## Fase 1

-   Fundação
-   Arquitetura
-   Design System
-   Tema
-   i18n

## Fase 2

-   Hero
-   Navegação
-   Layout

## Fase 3

-   Trabalhos
-   Estilos
-   Timeline
-   Filosofia
-   Contato

## Fase 4

-   Sanity CMS
-   Formulário
-   SEO
-   Analytics

## Fase 5

-   Responsividade
-   Acessibilidade
-   Performance
-   Polimento
-   Testes finais

------------------------------------------------------------------------

# 10. Critérios de Aceite

O projeto será considerado pronto quando:

-   Todo o conteúdo for gerenciável pelo CMS.
-   O layout respeitar integralmente os documentos 01--05.
-   O desempenho atender às metas de Lighthouse.
-   O site funcionar corretamente em desktop, tablet e smartphone.
-   O suporte a PT-BR e EN estiver completo.
-   Todas as animações forem consistentes com as Interaction Guidelines.
-   A experiência refletir a identidade artística do ART.

------------------------------------------------------------------------

# Filosofia

O documento define **como construir** o produto.

As decisões de produto, UX e UI permanecem centralizadas nos documentos
01 a 05.
