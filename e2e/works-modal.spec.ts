import { test, expect } from "@playwright/test";

test("abre, navega e fecha o modal de trabalhos", async ({ page }) => {
  await page.goto("/pt");

  await page.getByRole("button", { name: "Assistir CCXP 2025" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "CCXP 2025" }),
  ).toBeVisible();

  // foco inicial no botão fechar
  await expect(page.getByRole("button", { name: "Fechar" })).toBeFocused();

  // navega para o próximo trabalho pelo teclado
  await page.keyboard.press("ArrowRight");
  await expect(
    dialog.getByRole("heading", { name: "ART x K-Pop em Ritmo" }),
  ).toBeVisible();

  // ESC fecha
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
