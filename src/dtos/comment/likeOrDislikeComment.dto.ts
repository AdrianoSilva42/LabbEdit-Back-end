import {z} from 'zod'

export interface LikeOrDislikeCommentInputDTO{
    idToLikeOrDislike: string,
    token: string
    like: boolean
}


export const LikeOrDislikeCommentSchema = z.object({
    idToLikeOrDislike: z.string().min(1),
    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto"),
    
    like: z.boolean()
}).transform(data => data as LikeOrDislikeCommentInputDTO)