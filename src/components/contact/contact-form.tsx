"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

function buildSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t("nameRequired")),
    email: z.string().min(1, t("emailInvalid")).email(t("emailInvalid")),
    message: z.string().min(1, t("messageRequired")),
  });
}

const inputClass =
  "w-full border border-border bg-transparent px-4 py-3 text-body outline-none transition-shadow duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent)]";

export function ContactForm() {
  const t = useTranslations("Contact");
  const schema = useMemo(() => buildSchema(t), [t]);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Envio real (Resend + Turnstile) entra na Fase 4 — por ora só simula.
  const onSubmit = async () => {
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div role="status" className="border-border text-body border p-6">
        {t("success")}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 block underline underline-offset-4"
        >
          {t("send")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="text-body-sm mb-2 block">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          placeholder={t("namePlaceholder")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(inputClass, errors.name && "border-red-500")}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="text-body-sm mt-1 text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-body-sm mb-2 block">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(inputClass, errors.email && "border-red-500")}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="text-body-sm mt-1 text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-body-sm mb-2 block">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            inputClass,
            "resize-none",
            errors.message && "border-red-500",
          )}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-body-sm mt-1 text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-body-sm text-red-500">{t("error")}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "sending"}
        className="self-start"
      >
        {status === "sending" ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
