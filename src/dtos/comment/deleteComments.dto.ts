import {z} from 'zod'

export interface DeletarComentarioInputDTO{
    idToDelete: string | undefined,
    token: string | undefined
}


export interface DeletarComentarioOutputDTO{
    message: string
}


export const DeletarComentarioSchema = z.object({
    idToDelete: z.string().min(1),

    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto")
}).transform(data => data as DeletarComentarioInputDTO)