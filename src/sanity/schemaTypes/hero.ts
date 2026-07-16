import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  // Documento único — só deve existir um.
  fields: [
    defineField({ name: "headline", title: "Título", type: "localeString" }),
    defineField({
      name: "tagline",
      title: "Frase de impacto",
      type: "localeString",
    }),
    defineField({
      name: "video",
      title: "Vídeo de fundo",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "poster",
      title: "Imagem de fallback",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
