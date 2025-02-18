import Container from "@/components/container/Container";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import FollowingAuthorBlogs from "@/components/sections/FollowingAuthorBlogs";
import Hero from "@/components/sections/Hero";
import OurAuthors from "@/components/sections/OurAuthors";
import PopularBlogs from "@/components/sections/PopularBlogs";
import PopularCategories from "@/components/sections/PopularCategories";
import RecentBlogs from "@/components/sections/RecentBlogs";
import TrendingCategories from "@/components/sections/TrendingCategories";
import React from "react";

function page() {
  return (
    <Container>
      <Hero />
      <RecentBlogs />
      <FeaturedCategories />
      <PopularBlogs />
      <OurAuthors />
      {/* <FollowingAuthorBlogs/> */}
    </Container>
  );
}

export default page;
