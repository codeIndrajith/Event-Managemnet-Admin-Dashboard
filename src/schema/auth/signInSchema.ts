import z from "zod";

const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export default SignInSchema;
