import {z} from 'zod'


export interface DeletePostInputDTO {
    idToDelete: string;
    token: string | undefined;
 }


export const DeletePostSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto")
}).transform(data => data as DeletePostInputDTO) 