import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contato",
  type: "document",
  // Documento único — só deve existir um.
  fields: [
    defineField({ name: "title", title: "Título", type: "localeString" }),
    defineField({
      name: "invitation",
      title: "Texto de convite",
      type: "localeText",
    }),
    defineField({
      name: "instagramUrl",
      title: "Link do Instagram",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tiktokUrl",
      title: "Link do TikTok",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail de contato",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
  ],
});
