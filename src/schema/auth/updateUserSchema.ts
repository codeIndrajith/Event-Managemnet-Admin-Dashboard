import z from "zod";

const UserProfileUpdate = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    profileImage: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.name || data.email || data.profileImage;
    },
    {
      message: "At least one field nust be provided",
      path: ["name"],
    }
  );

export type UserProfileUpdateType = z.infer<typeof UserProfileUpdate>;

export default UserProfileUpdate;
