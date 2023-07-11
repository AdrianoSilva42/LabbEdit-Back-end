import { LikeOrDislikePostSchema } from './../dtos/postagem/likeOrDislikePost.dto';
import { BuscarPostSchema } from './../dtos/postagem/getPost.dto';
import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { ZodError } from 'zod';
import { CreatePostSchema } from '../dtos/postagem/createPost.dto';
import { DeletePostSchema } from '../dtos/postagem/deletePost.dto';


export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = BuscarPostSchema.parse({
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getPosts(input);

      res.status(200).send(output);
    } catch (error) {

      if(error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        console.log(error);
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        token: req.headers.authorization,
        content: req.body.content,
      });

      const output = await this.postBusiness.createPost(input);

      res.status(201).end(output);
    } catch (error) {

      if(error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        console.log(error);
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization,
      });

      await this.postBusiness.deletePost(input);

      res.status(200).end();
    }  catch (error) {

      if(error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        console.log(error);
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public likeOrDislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        idToLikeOrDislike: req.params.id,
        token: req.headers.authorization,
        like: req.body.like,
      });

      await this.postBusiness.likeOrDislikePost(input);

      res.status(200).end();
    }  catch (error) {

      if(error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        console.log(error);
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
