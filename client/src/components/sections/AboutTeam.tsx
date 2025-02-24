import Container from "../container/Container";

const AboutTeam = () => {
  const members = [
    {
      name: "Sarah Thompson",
      position: "Founder & CEO",
      photo: "https://aximo-react.vercel.app/assets/team1-DmWE10zh.png",
      bio: "Sarah's passion for nature and camping inspired her to create Campers Show. With a background in outdoor education, she leads the team with a vision to empower campers worldwide.",
    },
    {
      name: "David Rodriguez",
      position: "Product Manager",
      photo: "https://aximo-react.vercel.app/assets/team2-CCsDsUp2.png",
      bio: "David brings a wealth of experience in product development and outdoor gear. He ensures that Campers Show offers the best selection of camping equipment for every adventure.",
    },
    {
      name: "Emily Chen",
      position: "Content Editor",
      photo: "https://aximo-react.vercel.app/assets/team3-Dq8iIK3F.png",
      bio: "Emily is a seasoned writer with a deep love for storytelling and the outdoors. She crafts engaging guides and articles that inspire and inform campers around the globe.",
    },
    {
      name: "Mark Johnson",
      position: "Community Manager",
      photo: "https://aximo-react.vercel.app/assets/team4-CN3ED17F.png",
      bio: "Mark is dedicated to building a vibrant community at Campers Show. With a background in social media and customer relations, he fosters connections among outdoor enthusiasts and ensures everyone feels welcome.",
    },
  ];
  return (
    <Container>
      <div className="py-20">
        <div className=" space-y-2 text-center">
          <h1 className=" text-3xl font-semibold text-black">Our Team Members</h1>
          <p>We think our story isstarworth sharing with you</p>
        </div>
        <div className="py-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((member, index) => {
            return (
              <div className="space-y-2" key={index}>
                <div className="  border-4 border-gray-900 rounded-lg">
                  <img src={member.photo} alt="" />
                </div>
                <div className=" space-y-1 text-center">
                  <h1 className=" text-xl md:text-2xl text-black font-jakarta font-extrabold">
                    {member.name}
                  </h1>
                  <h2 className=" text-xs text-black font-jakarta font-extrabold">
                    {member.position}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default AboutTeam;
