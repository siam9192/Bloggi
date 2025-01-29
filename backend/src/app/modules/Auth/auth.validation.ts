import { z } from "zod";
import { NameValidationSchema } from "../../reuse/validation";

const SignUpValidationSchema = z.object({
  name: NameValidationSchema,
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

const LoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const ChangePasswordValidationSchema = z.object({
  newPassword: z.string(),
  oldPassword: z.string(),
});

const ResetPasswordValidation = z.object({
  token: z.string().nonempty(),
  newPassword: z.string().nonempty().min(6),
});

const AuthValidations = {
  SignUpValidationSchema,
  LoginValidationSchema,
  ResetPasswordValidation,
  ChangePasswordValidationSchema,
};
export default AuthValidations;
