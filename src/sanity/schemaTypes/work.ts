import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Trabalho",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "context", title: "Contexto", type: "localeText" }),
    defineField({
      name: "youtubeId",
      title: "ID do vídeo no YouTube",
      type: "string",
      description: "Apenas o ID (ex.: PJemSGbkqM0), não a URL completa.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewVideo",
      title: "Corte para preview (sem áudio)",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "thumbnail" },
  },
});
