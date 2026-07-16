import { defineField, defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Texto (PT/EN)",
  type: "object",
  fields: [
    defineField({
      name: "pt",
      title: "Português",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
