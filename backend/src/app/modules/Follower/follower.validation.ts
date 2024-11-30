import { z } from "zod";

const CreateFollowerValidation = z.object({
  author_id: z.number(),
});

// const DeleteFollowerValidation

const FollowerValidations = {
  CreateFollowerValidation,
};

export default FollowerValidations;
