import { UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";

const getPopularAuthorsFromDB = async (authUser: IAuthUser) => {
  const authors = await prisma.author.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      profile_photo: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },
    take: 10,
  });

  let followingAuthorsId: number[] = [];
  if (authUser.role === UserRole.Reader) {
    const followingAuthors = await prisma.follower.findMany({
      where: {
        reader_id: authUser.readerId,
      },
      select: {
        author_id: true,
      },
    });
    followingAuthorsId = followingAuthors.map((item) => item.author_id);
  }

  const data = authors.map((author) => ({
    ...author,
    full_name: [author.first_name, author.last_name].join(" "),
    is_following: followingAuthorsId.includes(author.id),
  }));

  return data;
};

const AuthorServices = {
  getPopularAuthorsFromDB,
};

export default AuthorServices;
