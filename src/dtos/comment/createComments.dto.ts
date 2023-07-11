import {z} from 'zod'


export interface CriarComentarioInputDTO{
    postId: string;
    content: string;
    token: string | undefined;
}


export interface CriarComentarioOutputDTO{
    message: string
}

export const CriarComentarioSchema = z.object({
    postId: z.string({
        required_error: "'id' é obrigatório",
        invalid_type_error: "'id' deve ser do tipo string"
    }).min(1),

    content: z.string({
        required_error: "'content' é obrigatório",
        invalid_type_error: "'content' deve ser do tipo string"
    }).min(1),
    
    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto")
}).transform(data => data as CriarComentarioInputDTO)