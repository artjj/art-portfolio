// Definir NEXT_PUBLIC_SITE_URL no ambiente de produção assim que o domínio
// estiver conectado à Vercel (doc 06 §2). Sem isso, cai no domínio da Vercel
// (se detectável) ou em localhost — só afeta URLs absolutas de SEO/OG.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// Fonte única do currículo em PDF (botão no Hero + modal de visualização).
// Não há campo de configurações gerais no Sanity ainda — pra atualizar o
// currículo, basta substituir o arquivo em
// public/documents/curriculo-artistico.pdf mantendo o mesmo nome.
export const resumeUrl = "/documents/curriculo-artistico.pdf";
