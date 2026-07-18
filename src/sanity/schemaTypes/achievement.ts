import { defineField, defineType } from "sanity";

export const achievement = defineType({
  name: "achievement",
  title: "Conquista",
  type: "document",
  fields: [
    defineField({
      name: "competition",
      title: "Competição",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "placement",
      title: "Colocação / Medalha",
      description: 'Ex.: "1º lugar", "Medalha de ouro".',
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "awardType",
      title: "Tipo de conquista",
      description:
        "Define o ícone exibido no site (🥇🥈🥉🏅) — não editar/inserir o emoji diretamente em nenhum outro campo.",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "🥇 1º lugar", value: "first" },
          { title: "🥈 2º lugar", value: "second" },
          { title: "🥉 3º lugar", value: "third" },
          { title: "🏅 Prêmio / destaque", value: "special" },
        ],
      },
      initialValue: "special",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria / Apresentação",
      description: "Opcional — ex.: Solo, Dupla, Grupo.",
      type: "localeString",
    }),
    defineField({
      name: "image",
      title: "Imagem da medalha ou premiação",
      description: "Opcional.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalUrl",
      title: "Link externo",
      description: "Opcional — ex.: post ou vídeo da premiação.",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
    }),
    defineField({
      name: "isVisible",
      title: "Visível no site",
      description: "Desmarque para ocultar temporariamente sem excluir.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "year", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "competition", subtitle: "year" },
  },
});
