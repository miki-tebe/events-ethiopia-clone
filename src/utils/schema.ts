import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string(),
  location: z.string().optional(),
  date: z.string(),
  description: z.string().optional(),
});

export type CreateEventInput = z.TypeOf<typeof createEventSchema>;

export const getSingleEventSchema = z.object({
  id: z.string().uuid(),
});
