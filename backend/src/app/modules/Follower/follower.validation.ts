import { FollowerStatus } from "@prisma/client";
import { z } from "zod";

const CreateFollowerValidation = z.object({
  author_id: z.number(),
});

const ChangeFollowerStatusValidation = z.object({
  reader_id: z.number(),
  status: z.nativeEnum(FollowerStatus),
});

const FollowerValidations = {
  CreateFollowerValidation,
  ChangeFollowerStatusValidation,
};

export default FollowerValidations;
