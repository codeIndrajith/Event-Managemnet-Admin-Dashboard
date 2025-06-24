import { z } from "zod";

// Define Zod schema

export const BaseSchema = z.object({
  file: z.any(),
  approverName: z.string().min(1, "Approver name is required"),
  approverRole: z.string().min(1, "Approver role is required"),
  reason: z.string(),
});

export const EventApproveOrRejectSchema = (isApprove: boolean) =>
  BaseSchema.superRefine((data, ctx) => {
    if (isApprove) {
      if (!(data.file instanceof File)) {
        ctx.addIssue({
          path: ["file"],
          code: z.ZodIssueCode.custom,
          message: "PDF file is required",
        });
      } else if (data.file.type !== "application/pdf") {
        ctx.addIssue({
          path: ["file"],
          code: z.ZodIssueCode.custom,
          message: "Only PDF files are allowed",
        });
      }
    } else {
      if (!data.reason || data.reason.trim() === "") {
        ctx.addIssue({
          path: ["reason"],
          code: z.ZodIssueCode.custom,
          message: "Reason is required",
        });
      }
    }
  });

export type EventApproveOrRejectSchemaType = z.infer<typeof BaseSchema>;
