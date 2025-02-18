"use client";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import "@/styles/hero.style.css";
import { HiArrowLongRight } from "react-icons/hi2";
import Container from "../container/Container";
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(1);

  const featuredBlogs = [
    {
      title: "The Future of AI: Trends to Watch in 2025",
      image_url: "https://ophtek.com/wp-content/uploads/2020/05/workhome.png",
      short_description:
        "Discover the top AI trends that will shape the world in 2025, from machine learning breakthroughs to ethical AI discussions.\n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod dolor, aut officia unde explicabo ea culpa nam consectetur accusamus totam animi dolores! Iste harum asperiores pariatur facilis. Vitae quod nihil dignissimos deserunt sequi expedita assumenda? Cupiditate necessitatibus exercitationem laborum? A enim aliquid modi perspiciatis sequi, architecto dolor consequuntur quibusdam.",
    },
    {
      title: "10 Must-Have Gadgets for Tech Enthusiasts",
      image_url:
        "https://9253440.fs1.hubspotusercontent-na1.net/hubfs/9253440/Happy-collegues-working-on-project-together-workplace-environments.jpg",
      short_description:
        "A curated list of the best gadgets in 2024 that every tech lover needs, from smart home devices to wearable technology. \n   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod dolor, aut officia unde explicabo ea culpa nam consectetur accusamus totam animi dolores! Iste harum asperiores pariatur facilis. Vitae quod nihil dignissimos deserunt sequi expedita assumenda? Cupiditate necessitatibus exercitationem laborum? A enim aliquid modi perspiciatis sequi, architecto dolor consequuntur quibusdam.",
    },
    {
      title: "Mastering Remote Work: Tips for Productivity",
      image_url:
        "https://st2.depositphotos.com/3591429/9262/i/450/depositphotos_92623612-stock-photo-business-people-group.jpg",
      short_description:
        "Learn effective strategies for staying productive while working remotely, including time management and collaboration tips.\n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod dolor, aut officia unde explicabo ea culpa nam consectetur accusamus totam animi dolores! Iste harum asperiores pariatur facilis. Vitae quod nihil dignissimos deserunt sequi expedita assumenda? Cupiditate necessitatibus exercitationem laborum? A enim aliquid modi perspiciatis sequi, architecto dolor consequuntur quibusdam.",
    },
    {
      title: "Sustainable Tech: How Innovation is Going Green",
      image_url:
        "https://www.betterup.com/hubfs/group%20of%20business%20people%20having%20a%20meeting.jpg",
      short_description:
        "Explore the latest advancements in sustainable technology and how companies are reducing their carbon footprint with innovation.\n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod dolor, aut officia unde explicabo ea culpa nam consectetur accusamus totam animi dolores! Iste harum asperiores pariatur facilis. Vitae quod nihil dignissimos deserunt sequi expedita assumenda? Cupiditate necessitatibus exercitationem laborum? A enim aliquid modi perspiciatis sequi, architecto dolor consequuntur quibusdam.",
    },
  ];

  function getSubarray(arr: any[], active: number) {
    let n = arr.length;
    let k = active - 1; // Convert to 0-based index
    return [
      arr[(k - 1 + n) % n], // (k-1) mod n, handling negative index
      arr[k % n], // k mod n
      arr[(k + 1) % n], // (k+1) mod n
    ];
  }

  useEffect(() => {
    const heroDiv = ref.current;
    if (heroDiv) {
      const url = featuredBlogs[active - 1].image_url;

      heroDiv.style.backgroundImage = `linear-gradient(to top left, rgba(0,0,1,0.7) 10%, rgba(0,0,1,0.1)90%),url(${url})`;
    }
  }, [ref.current, active]);

  useEffect(() => {
    const intervel = setInterval(() => {
      goNextPage();
    }, 5000);
    return () => {
      clearInterval(intervel);
    };
  }, [active]);
  function goNextPage() {
    const next = active + 1;
    const nextPage = next > totalPages ? 1 : next;
    setActive(nextPage);
  }

  const totalPages = featuredBlogs.length;

  const currentStyle = (index: number): CSSProperties => {
    return {
      left: `${index * 100}%`,
      transform: `translateX(-${(active - 1) * 100}%)`,
      transition: "transform 0.5s ease-in-out",
    };
  };

  return (
    <div ref={ref} className=" mt-5 h-[85vh]  rounded-md   hero">
      <Container className="relative overflow-hidden w-full h-full">
        <div>
          {featuredBlogs.map((blog, index) => {
            return (
              <div
                key={"blog-" + (index + 1)}
                className="absolute w-full h-full"
                style={currentStyle(index)}
              >
                <div className="absolute left-10 right-10 bottom-20 w-full">
                  <div className="space-y-4 w-10/12">
                    <div className="space-y-2">
                      <h3 className="text-2xl text-white font-jost font-medium">Featured</h3>
                      <h1 className=" text-4xl md:text-6xl text-white font-jost font-medium">
                        {blog.title}
                      </h1>
                    </div>
                    <p className="text-[0.9rem] text-white">{blog.short_description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => goNextPage()}
          className="  text-[70px] md:text-[90px] text-white  absolute  right-16 md:right-20  bottom-10 md:bottom-[70px] hover:text-secondary_color hover:text-[80px] transition-all duration-75 ease-in-out"
        >
          <HiArrowLongRight />
        </button>
        <div className="absolute  bottom-5 w-full  flex justify-center items-center gap-2">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                onClick={() => setActive(page)}
                key={"hero-page-" + page}
                className={`size-4  rounded-full  flex justify-center items-center  transition-transform duration-100 ease-in-out ${page === active ? "scale-125 bg-secondary_color" : "scale-100 bg-white "}`}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Hero;
