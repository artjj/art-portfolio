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
      name: "description",
      title: "Descrição",
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
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
