"use client";
import popularCategories from "@/data/poular-catgories.data";
import { useGetPopularCategoriesQuery } from "@/redux/features/category/category.api";
import Link from "next/link";
import React, { CSSProperties } from "react";

const getStyle = (category: { name: string; slug: string; image_url: string }): CSSProperties => {
  return {
    width: "100%",
    height: "250px",
    backgroundImage: `linear-gradient(to top right, rgba(0,0,1,0.7) 10%, rgba(0,0,1,0.1)90%),url(${category.image_url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
};

function PopularCategories() {
  const { data, isLoading } = useGetPopularCategoriesQuery(undefined);

  const categories = data?.data;

  return (
    <div className="py-20">
      <h1 className="text-3xl md:text-4xl font-jost font-extrabold">Popular Categories</h1>
      <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-3  grid-cols-2 gap-5 ">
        {categories?.map((category, index) => (
          <Link href={""} key={"popular-category-" + index}>
            <div style={getStyle(category)}>
              <h1 className="text-xl text-center font-medium py-3 px-6 bg-opacity-40 bg-black  text-white font-jost h-fit  w-[70%] hover:backdrop-blur-sm">
                {category.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;
