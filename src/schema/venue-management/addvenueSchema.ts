import { z } from "zod";

export const venueSchema = z.object({
  venueName: z
    .string()
    .min(1, { message: "Venue name is required" })
    .max(100, { message: "Venue name cannot exceed 100 characters" }),
  locationType: z.string().min(1, "Location type is required"),
  maxAttendees: z
    .number()
    .min(1, "Maximum attendees is required")
    .max(100000, "Maximum attendees cannot exceed 100,000"),
});

export type VenuSchemaType = z.infer<typeof venueSchema>;
