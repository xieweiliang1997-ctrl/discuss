import {prisma} from "@/src/prisma";
import type {Post} from ".prisma/client";

export type PostWithData = {
  User: { name: string | null ,image?:string|null} | null,
  Topic: { name: string } | null,
  _count: { comments: number }
}&Post;


export function fetchPostsByTopicName(name: string):Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: {
      Topic: {
        name
      }
    },
    include: {
      User: {
        select: {
          name: true
        }
      },
      Topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    }
  })
}

export function fetchTopPosts():Promise<PostWithData[]>{
  return prisma.post.findMany({
    orderBy:[{
      comments:{
        _count:'desc'
      }
    }],
    take:5,
    include: {
      User: {
        select: {
          name: true,
          image:true,
        }
      },
      Topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    }
  })
}