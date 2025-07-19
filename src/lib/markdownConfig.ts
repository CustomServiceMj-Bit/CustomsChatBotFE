import { defaultSchema } from "hast-util-sanitize";

export const customSanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
  ],
  attributes: {
    ...defaultSchema.attributes,
    table: [],
    thead: [],
    tbody: [],
    tr: [],
    th: [],
    td: [],
  },
};
