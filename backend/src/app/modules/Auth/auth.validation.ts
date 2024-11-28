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

const AuthValidations = {
  SignUpValidationSchema,
  LoginValidationSchema,
};
export default AuthValidations;
