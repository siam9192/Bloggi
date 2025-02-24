import NavbarRoutesData from "@/routes/navbar.route";
import Container from "../container/Container";
import Link from "next/link";
import { GoBell } from "react-icons/go";
import { CgMenuLeftAlt } from "react-icons/cg";
import ResponsiveNavbar from "../ui/ResponsiveNavbar";
import { getCurrentUser } from "@/services/auth.service";
import { EUserRole } from "@/types/user.type";
import NotificationBar from "../ui/NotificationBar";
import BlogSearchButton from "../ui/BlogSearchButton";

const Header = async () => {
  const user = await getCurrentUser();
  let profile;
  if (user) {
    profile = user.author || user.reader || user.staff;
  }

  return (
    <div className=" py-3 md:py-5  border-b-2 bg-white  ">
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-2  w-fit">
          <img src="/images/logo.png" alt="" className=" size-10 md:size-12 rounded-full" />
          <h1 className=" text-2xl md:text-3xl font-bold font-jost ">Blogi</h1>
        </div>
        <div className="md:flex items-center gap-6  text-[1.1rem] font-medium md:block hidden">
          {NavbarRoutesData.map((item) => (
            <Link href={item.path} key={item.path} className="hover:text-blue-600 ">
              {item.name}
            </Link>
          ))}
        </div>
        {!user && (
          <div className="md:flex items-center gap-4 md:block hidden">
            <button className="font-semibold font-jost">Login</button>
            <button className="px-8 py-3 bg-primary_color rounded-full text-white hover:bg-secondary_color duration-75 hover:text-black font-medium font-jost">
              Sign Up
            </button>
          </div>
        )}
        <div className="flex  items-center gap-3">
          <BlogSearchButton />
          {user && (
            <>
              <NotificationBar />
              <Link href={`/dashboard/${user?.role.toLocaleLowerCase()}`}>
                <img
                  className="size-12 rounded-full  border-2 border-primary_color"
                  src={profile?.profile_photo}
                  alt=""
                />
              </Link>
            </>
          )}
          <ResponsiveNavbar />
        </div>
      </Container>
    </div>
  );
};

export default Header;
