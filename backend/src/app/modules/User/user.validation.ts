import { object, z } from "zod";
import {
  NameValidationSchema,
  PasswordValidation,
} from "../../reuse/validation";
import { SocialPlatform, UserRole } from "@prisma/client";

const CreateStaffValidation = z.object({
  name: NameValidationSchema,
  email: z.string(),
  password: PasswordValidation,
  profile_photo: z.string().url().optional(),
  role: z.enum(
    Object.values(
      Object.values(UserRole).filter(
        (role) => role !== UserRole.Reader || role !== UserRole.Reader,
      ),
    ) as [string, ...string[]],
  ),
});

const SocialLinkValidation = z.object({
  platform: z.enum(Object.values(SocialPlatform) as [string, ...string[]]),
  url: z.string().url(),
});

const CreateAuthorValidation = z.object({
  name: NameValidationSchema,
  email: z.string(),
  password: PasswordValidation,
  profile_photo: z.string().url(),
  bio: z.string().min(20).max(2000),
  social_links: z.array(SocialLinkValidation).default([]),
});

const ChangeUserStatusValidation = z.object({
  user_id: z.number(),
  status: z.enum(["Active", "Blocked"]),
});

const UserValidations = {
  CreateStaffValidation,
  CreateAuthorValidation,
  ChangeUserStatusValidation,
};

export default UserValidations;
