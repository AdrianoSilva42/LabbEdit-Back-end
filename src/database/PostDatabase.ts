import {
  LikeDislikeDB,
  LIKED_DISLIKED,
  PostDB,
  PostWithCreatorsDB,
} from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public getPostsWithCreators = async (): Promise<PostWithCreatorsDB[]> => {
    const result: PostWithCreatorsDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.comments",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "users.name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id");

    return result;
  };

  public insert = async (postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB);
  };

  public findById = async (id: string): Promise<PostDB | undefined> => {
    const result: PostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    )
      .select()
      .where({ id });
    return result[0];
  };

  public findPostWithCreatorById = async (
    postId: string
  ): Promise<PostWithCreatorsDB | undefined> => {
    const result: PostWithCreatorsDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.comments",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "users.name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id")
      .where("posts.id", postId);
    return result[0];
  };

  public findLikeDislike = async (
    likeDislikeDBToFind: LikeDislikeDB
  ): Promise<LIKED_DISLIKED | null> => {
    const [likeDislikeDB]: LikeDislikeDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_LIKES_DISLIKES
    )
      .select()
      .where({
        user_id: likeDislikeDBToFind.user_id,
        post_id: likeDislikeDBToFind.post_id,
      });
    if (likeDislikeDB) {
      return likeDislikeDB.like === 1
        ? LIKED_DISLIKED.ALREADY_LIKED
        : LIKED_DISLIKED.ALREADY_DISLIKED;
    } else {
      return null;
    }
  };

  public update = async (id: string, postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id });
  };

  public delete = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ id });
  };

  public likeOrDislikePost = async (
    likeDislike: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).insert(
      likeDislike
    );
  };

  public removeLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };

  public updateLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };
}
