import { PostDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const postsMock: PostDB[] = [
    {
        id: "p001",
        creator_id: "u001",
        content: "conteudo 01",
        comments: 1,
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString()  
    },
    {
        id: "p002",
        creator_id: "u002",
        content: "conteudo 02",
        comments: 1,
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString()  
    }
]

