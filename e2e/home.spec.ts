import { test, expect } from "@playwright/test";

test("carrega a home em PT com todas as seções", async ({ page }) => {
  await page.goto("/pt");
  await expect(page.locator("h1")).toHaveText("ART");

  await expect(page.getByRole("heading", { name: "Trabalhos" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Estilos" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Trajetória" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Vamos criar juntos" }),
  ).toBeVisible();
});

test("versão EN carrega com o conteúdo traduzido", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { name: "Works" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Let's create together" }),
  ).toBeVisible();
});

test("não tem overflow horizontal no mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/pt");
  const hasOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
