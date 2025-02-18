"use client";
import { readAllImagesFromCloud } from "@/cloudinary";
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface IInitialImagesContext {
  images: string[];
  updateImages(images: string[]): void;
}

const Context = createContext<IInitialImagesContext | null>(null);
const ImageProvider: FC<IProps> = ({ children }: IProps) => {
  const [images, setImages] = useState<string[]>([]);
  const updateImages = (data: string[]) => {
    setImages([...data, ...images]);
  };

  useEffect(() => {
    readAllImagesFromCloud().then(setImages);
  }, []);
  return (
    <Context.Provider
      value={{
        images,
        updateImages,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ImageProvider;

export const useImages = () => useContext(Context);
