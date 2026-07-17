import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { ContactForm } from "./contact-form";

const messages = {
  Contact: {
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Conte um pouco sobre o projeto",
    send: "Enviar mensagem",
    sending: "Enviando...",
    success: "Mensagem enviada! Retorno em breve.",
    error: "Não foi possível enviar agora. Tente novamente.",
    nameRequired: "Informe seu nome.",
    emailInvalid: "Informe um e-mail válido.",
    messageRequired: "Escreva uma mensagem.",
  },
};

function renderForm() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ContactForm />
    </NextIntlClientProvider>,
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("mostra erros de validação ao enviar vazio", async () => {
    renderForm();
    await userEvent.click(
      screen.getByRole("button", { name: "Enviar mensagem" }),
    );

    expect(await screen.findByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(screen.getByText("Escreva uma mensagem.")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("envia e mostra mensagem de sucesso com dados válidos", async () => {
    renderForm();

    await userEvent.type(screen.getByLabelText("Nome"), "Teste da Silva");
    await userEvent.type(screen.getByLabelText("E-mail"), "teste@example.com");
    await userEvent.type(
      screen.getByLabelText("Mensagem"),
      "Mensagem de teste.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Enviar mensagem" }),
    );

    await waitFor(() => {
      expect(
        screen.getByText("Mensagem enviada! Retorno em breve."),
      ).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("mostra erro amigável quando o envio falha", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    renderForm();

    await userEvent.type(screen.getByLabelText("Nome"), "Teste da Silva");
    await userEvent.type(screen.getByLabelText("E-mail"), "teste@example.com");
    await userEvent.type(
      screen.getByLabelText("Mensagem"),
      "Mensagem de teste.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Enviar mensagem" }),
    );

    expect(
      await screen.findByText(
        "Não foi possível enviar agora. Tente novamente.",
      ),
    ).toBeInTheDocument();
  });
});
