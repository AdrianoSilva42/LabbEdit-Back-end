import {z} from 'zod'
import { PostModel } from '../../types'

export interface BuscarPostInputDTO{
    token: string
}

export type BuscarPostOutputDTO = PostModel[]


export const BuscarPostSchema = z.object({
    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto")
}).transform(data => data as BuscarPostInputDTO)