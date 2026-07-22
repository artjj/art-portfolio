import { defineField, defineType } from "sanity";

export const danceStyle = defineType({
  name: "danceStyle",
  title: "Estilo",
  type: "document",
  fields: [
    defineField({
      name: "styleId",
      title: "Identificador",
      type: "string",
      options: {
        list: [
          { title: "Dancehall", value: "dancehall" },
          { title: "Krump", value: "krump" },
          { title: "Hip Hop", value: "hiphop" },
          { title: "Popping", value: "popping" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nome de exibição",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "description",
      title: "Descrição (texto curto do card)",
      type: "localeText",
    }),
    defineField({
      name: "featured",
      title: "Em destaque (Dancehall/Krump)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trajectory",
      title: "Trajetória (texto completo do modal)",
      description:
        "Narrativa artística — quando começou, com quem aprendeu, referências, experiências, se continua estudando e como influencia a pesquisa atual. Pode deixar linhas em branco entre parágrafos.",
      type: "localeText",
    }),
    defineField({
      name: "mentors",
      title: "Professores ou referências",
      type: "localeString",
    }),
    defineField({
      name: "currentStatus",
      title: "Estado atual do estudo",
      type: "localeString",
    }),
    defineField({
      name: "modalImage",
      title: "Imagem do modal (opcional)",
      description: "Se vazio, o modal reaproveita a imagem do card.",
      type: "image",
      options: { hotspot: true },
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
    select: { title: "name", media: "image" },
  },
});
