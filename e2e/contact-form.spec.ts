import { test, expect } from "@playwright/test";

// Só testa validação client-side — nunca completa um envio real aqui pra
// não disparar e-mails de verdade via Resend a cada rodada de testes.
test("mostra erros de validação ao enviar o formulário vazio", async ({
  page,
}) => {
  await page.goto("/pt");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();

  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
  await expect(page.getByText("Escreva uma mensagem.")).toBeVisible();
});
