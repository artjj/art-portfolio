import { defineField, defineType } from "sanity";

export const timelineItem = defineType({
  name: "timelineItem",
  title: "Marco da Trajetória",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "Título", type: "localeString" }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "localeText",
    }),
  ],
  orderings: [
    {
      title: "Ano",
      name: "yearAsc",
      by: [{ field: "year", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.pt", subtitle: "year" },
  },
});
