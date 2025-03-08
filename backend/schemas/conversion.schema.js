import { z } from "zod";

export const conversionSchema = z.object({
  value: z
    .number({ required_error: "This field is required" })
    .positive("The value must be greater than zero"),
  from: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
  to: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
  type: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
});
