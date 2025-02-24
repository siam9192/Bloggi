import Container from "../container/Container";

const AboutMission = () => {
  return (
    <Container>
      <div className="py-10">
        <div className=" grid grid-cols-1 md:grid-cols-2">
          <div className=" space-y-2">
            <h1 className=" text-3xl font-bold text-black">Our Mission</h1>
            <p>
              Campers Show, our mission is to ignite the spirit of adventure and connect outdoor
              enthusiasts with the perfect gear and information to make their camping experiences
              unforgettable. We believe that nature is not just a place to visit, but a home to
              cherish and protect, and camping is a powerful way to foster this connection. Founded
              on the principles of passion for the outdoors and a commitment to quality, Campers
              Show serves as a comprehensive resource for campers of all levels, from beginners to
              seasoned explorers. Our goal is to inspire and empower our community through expert
              advice, in-depth reviews, and a curated selection of top-notch camping gear and
              equipment. We strive to be more than just a marketplace. Campers Show is a platform
              where knowledge meets inspiration, offering detailed guides on everything from
              choosing the right tent for your adventure to cooking delicious meals over a campfire.
              We celebrate the diversity of camping styles, whether you're into backpacking through
              remote trails or setting up a cozy campsite by the lake. Environmental stewardship is
              at the core of what we do. We promote sustainable practices and eco-friendly products
              to minimize our footprint while enjoying the great outdoors. By partnering with brands
              that share our values, we ensure that every purchase made through Campers Show
              contributes to preserving the natural beauty we all love. Beyond products and guides,
              Campers Show fosters a vibrant community where campers can share stories, exchange
              tips, and find inspiration for their next expedition. We believe in the transformative
              power of nature and strive to make camping accessible and enjoyable for everyone. Join
              us at Campers Show as we embark on a journey to explore, connect, and thrive in the
              great outdoors. Whether you're planning your first camping trip or looking to upgrade
              your gear, we're here to support you every step of the way. Let's make every camping
              experience a memorable adventure!
            </p>
          </div>
          <div className="py-10">
            <img className="mask mask-pentagon w-full " src="/images/meeting1.jpg" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutMission;
