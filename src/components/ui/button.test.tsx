import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renderiza <button> quando não recebe href", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("renderiza <a> quando recebe href (evita <button> dentro de <a>)", () => {
    render(<Button href="#contact">Contato</Button>);
    const link = screen.getByRole("link", { name: "Contato" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#contact");
  });

  it("dispara onClick quando renderizado como button", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Clique" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
