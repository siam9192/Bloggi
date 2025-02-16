import e, { Request } from "express";
import prisma from "../../shared/prisma";
import { UserRole } from "@prisma/client";
import {
  IUpdateAuthorProfileData,
  IUpdateReaderProfileData,
  IUpdateStaffProfileData,
} from "./profile.interface";
import ProfileValidations from "./profile.validation";

const getUserProfileByIdFromDB = async (id: string | number) => {
  // Get user if user not exist then throw user not found error
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: Number(id),
    },
    include: {
      author: {
        include: {
          social_links: true,
          _count: {
            select: {
              followers: true,
              blogs: true,
            },
          },
        },
      },
      reader: {
        include: {
          _count: {
            select: {
              following: true,
              comments: true,
            },
          },
        },
      },
      staff: true,
    },
  });

  const userRole = user.role;
  let result;
  if (userRole === "Reader") {
    const profile = user.reader;

    if (profile) {
      result = {
        email: user.email,
        role: user.role,
        first_name: profile.first_name,
        last_name: profile.last_name,
        profile_photo: profile.profile_photo,
        count: {
          ...profile._count,
        },
        status: user.status,
        join_date: user.join_date,
      };
    }
  } else if (userRole === "Author") {
    const profile = user.author;

    if (profile) {
      result = {
        email: user.email,
        role: user.role,
        name: {
          first: profile.first_name,
          last: profile.last_name,
        },
        bio: profile.bio,
        profile_photo: profile.profile_photo,
        social_links: profile.social_links,
        count: {
          ...profile._count,
        },
        status: user.status,
        join_date: user.join_date,
      };
    }
  } else {
    const profile = user.staff;
    if (profile) {
      result = {
        email: user.email,
        role: user.role,
        name: {
          first: profile.first_name,
          last: profile.last_name,
        },
        profile_photo: profile.profile_photo,
        status: user.status,
        join_date: user.join_date,
      };
    }
  }

  return result;
};

const updateMyProfileIntoDB = async (req: Request) => {
  const user = req.user;
  const role = user.role;

  // Check user existence
  await prisma.user.findUniqueOrThrow({
    where: {
      id: Number(user.id),
    },
  });

  const userId = Number(user.id);
  let result;

  if (role === UserRole.Reader) {
    const data = req.body as IUpdateReaderProfileData;
    ProfileValidations.UpdateReaderProfileValidation.parse(data);

    result = await prisma.reader.update({
      where: {
        user_id: userId,
      },
      data: data,
    });
  } else if (role === UserRole.Author) {
    const authorData = await prisma.author.findUniqueOrThrow({
      where: {
        user_id: userId,
      },
    });
    ProfileValidations.UpdateAuthorProfileValidation.parse(req.body);
    const { social_links, ...data } = req.body as IUpdateAuthorProfileData;

    result = prisma.$transaction(async (trClient) => {
      if (data) {
        await trClient.author.update({
          where: {
            user_id: userId,
          },
          data,
        });
      }

      // If social link exist
      if (social_links && social_links.length) {
        // Filter deleted social links
        const deletedSocialLinks = social_links.filter(
          (ele) => ele.is_deleted === true,
        );

        // Filter updated social links
        const updatedSocialLinks = social_links.filter(
          (ele) =>
            ele.is_deleted === false ||
            ele.is_deleted === undefined ||
            ele.is_new_added === false ||
            ele.is_new_added === undefined,
        );

        // If deleted social links exits then delete the social links from DB
        if (deletedSocialLinks.length) {
          for (const link of deletedSocialLinks) {
            await trClient.socialLink.delete({
              where: {
                author_id_platform: {
                  author_id: authorData.id,
                  platform: link.platform,
                },
              },
            });
          }
        }

        // If updated social links exists then upsert the social links into DB
        if (updatedSocialLinks.length) {
          for (const link of social_links) {
            await trClient.socialLink.upsert({
              where: {
                author_id_platform: {
                  author_id: authorData.id,
                  platform: link.platform,
                },
              },
              update: {
                url: link.url,
              },
              create: {
                author_id: authorData.id,
                platform: link.platform,
                url: link.url,
              },
            });
          }
        }
      }

      return await trClient.author.findUnique({
        where: {
          user_id: userId,
        },
        include: {
          social_links: true,
        },
      });
    });
  }

  // Update staff data
  else {
    const data = req.body as IUpdateStaffProfileData;
    ProfileValidations.UpdateStaffProfileValidation.parse(data);
    result = await prisma.staff.updateMany({
      where: {
        user_id: userId,
      },
      data,
    });
  }
  return result;
};

const ProfileServices = {
  getUserProfileByIdFromDB,
  updateMyProfileIntoDB,
};

export default ProfileServices;
