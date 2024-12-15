import { string, z } from "zod";

const ChildrenCategoryValidation = z.object({
    name:z.string(),
    image_url:z.string().url()
})

const CreateCategoryValidation = z.object({
    patent_id:z.number().optional(),
    name:string(),
    image_url:z.string().url().optional(),
    description:z.string().min(10,"Description must be at least 10 character and upto 1000 character").max(1000).optional()
})


const UpdateCategoryValidation = z.object({
    categoryId:z.string(),
    name:z.string().nonempty(),
    image_url:z.string().url().optional(),
    description:z.string().min(10,"Description must be at least 10 character and upto 1000 character").max(1000).optional()
})


const CategoryValidations  = {
    CreateCategoryValidation,
    UpdateCategoryValidation
}


export default CategoryValidations
