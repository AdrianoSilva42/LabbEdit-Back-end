import {z} from 'zod'


export interface LikeOrDislikePostInputDTO {
    idToLikeOrDislike: string;
    token: string | undefined;
    like: boolean;
  }


  export const LikeOrDislikePostSchema = z.object({
    idToLikeOrDislike: z.string().min(1),

    token: z.string({
        required_error: "'token' é obrigatório",
        invalid_type_error: "'token' deve ser do tipo string"
        })
        .min(1, "'token' incompleto"),

    like: z.boolean()
  }).transform(data => data as LikeOrDislikePostInputDTO)