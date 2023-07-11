import {z} from 'zod'


export interface CreatePostInputDTO{
    token: string | undefined;
    content: string;
}


export const CreatePostSchema = z.object({
    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto"),
    content: z.string().min(1, "Post não pode ser em branco") 
}).transform(data => data as CreatePostInputDTO)