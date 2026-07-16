import { defineField, defineType } from "sanity";

export const philosophy = defineType({
  name: "philosophy",
  title: "Filosofia",
  type: "document",
  // Documento único — só deve existir um.
  fields: [
    defineField({
      name: "quote",
      title: "Frase de impacto",
      type: "localeString",
    }),
    defineField({ name: "body", title: "Texto", type: "localeText" }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
