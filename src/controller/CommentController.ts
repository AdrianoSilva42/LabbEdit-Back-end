import { LikeOrDislikeCommentSchema } from './../dtos/comment/likeOrDislikeComment.dto';
import { CriarComentarioSchema } from './../dtos/comment/createComments.dto';
import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { BaseError } from "../errors/BaseError";
import { BuscarComentariosSchema } from "../dtos/comment/getComments.dto";
import { DeletarComentarioSchema } from '../dtos/comment/deleteComments.dto';
import {ZodError} from 'zod';

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}

  public getComments = async (req: Request, res: Response) => {
    try {
      const input = BuscarComentariosSchema.parse({
        postId: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.commentBusiness.getComments(input);

      res.status(200).send(output);
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

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CriarComentarioSchema.parse({
        postId: req.params.id,
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output = await this.commentBusiness.createComment(input);

      res.status(201).send(output);
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

  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input = DeletarComentarioSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.commentBusiness.deleteComment(input);

      res.status(200).send(output);
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

  public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        idToLikeOrDislike: req.params.id,
        token: req.headers.authorization,
        like: req.body.like,
      });

      const output = await this.commentBusiness.likeOrDislikeComment(input);

      res.status(200).send(output);
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
