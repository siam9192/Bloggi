"use server";
import { v2 as cloud, UploadApiResponse } from "cloudinary";

cloud.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const uploadFile = async (data: FormData): Promise<UploadApiResponse | undefined> => {
  const file = data.get("file");
  if (file instanceof File && file.type.startsWith("image")) {
    const buffer = Buffer.from(await file.arrayBuffer());
    return new Promise((resolve, reject) => {
      cloud.uploader
        .upload_stream(
          {
            folder: "blogi-images",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });
  }
};

export const readAllImagesFromCloud = async () => {
  try {
    const { resources } = (await cloud.api.resources({
      prefix: "blogi-images",
      resource_type: "image",
      type: "upload",
    })) as { resources: UploadApiResponse[] };
    return resources.map(({ secure_url }) => secure_url);
  } catch (error) {
    console.log(error);
    return [];
  }
};
