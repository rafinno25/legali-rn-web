import { z } from "zod";

export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profileImage: z.string().nullable().optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/i, "Use YYYY-MM-DD format")
    .optional()
    .or(z.literal("")),
  stateId: z.string().optional().or(z.literal("")),
  cityId: z.string().optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;