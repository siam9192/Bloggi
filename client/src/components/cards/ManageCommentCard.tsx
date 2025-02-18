"use state";
import { IComment } from "@/types/comment.type";
import { getTimeAgo } from "@/utils/func";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { IoCaretDownSharp } from "react-icons/io5";

interface IProps {
  comment: IComment;
}

const ManageCommentCard = ({ comment }: IProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const toggleShowReplies = () => setShowReplies(!showReplies);
  const [isManageMenuOpen, setIsMangeMenuOption] = useState(false);
  const manageMenuRef = useRef<HTMLDivElement>(null);

  const count = comment._count;

  useEffect(() => {
    const handel = (e: MouseEvent) => {
      const manageMenu = manageMenuRef.current;
      const target = e.target;

      if (!manageMenu || !target) return;
      if (!manageMenuRef.current.contains(target as Node)) {
        setIsMangeMenuOption(false);
      }
    };
    document.addEventListener("click", handel);

    return () => {
      document.removeEventListener("click", handel);
    };
  }, [isManageMenuOpen]);

  const optionMenuItems = [
    {
      title: "Remove",
      clickFn: () => {},
    },
    {
      title: "Block Mr.Jalal Uddin",
      clickFn: () => {},
    },
    {
      title: "Report",
      clickFn: () => {},
    },
  ];

  return (
    <div className="space-y-2 p-2 border rounded-md">
      <div className="flex  gap-4">
        <img
          src="https://t3.ftcdn.net/jpg/02/70/80/44/360_F_270804457_0IK5O61qgIWAYUXIYWeBBaSFaKngjysa.jpg"
          className=" md:size-14 size-10 rounded-full"
          alt=""
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold md:text-[1.1rem] text-[0.9rem]">Mr.Jalal Uddin</h2>
            <p>{getTimeAgo(new Date().toString())}</p>
          </div>
          <p className="text-gray-800 md:text-[1rem] text-[0.9rem]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et velit obcaecati eveniet
            reprehenderit facilis id saepe qui, architecto provident sunt, aperiam dolor vero
            nesciunt, officia totam. Cum laboriosam, vitae iste excepturi fugit magni et! Odio enim
            natus quae cum dolor!
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-fit flex items-center gap-1">
                <span className="text-2xl text-green-400">
                  <AiOutlineLike />
                </span>
                <span className="text-primary_color">20</span>
              </div>
              <div className="w-fit flex items-center gap-1">
                <span className="text-2xl text-red-400">
                  <AiOutlineDislike />
                </span>
                <span className="text-primary_color">20</span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMangeMenuOption(true);
                }}
                className="md:text-2xl text-xl bg-gray-50 p-2 rounded-md hover:text-blue-500"
              >
                <BsThreeDots />
              </button>
              {isManageMenuOpen && (
                <div
                  ref={manageMenuRef}
                  className="absolute z-40  h-40 w-60  p-2 top-10  right-2 bg-primary_color rounded-md  space-y-2"
                >
                  {optionMenuItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={item.clickFn}
                      className="text-white  block text-[0.9rem] hover:text-secondary_color"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {count.replies ? (
            <button
              onClick={toggleShowReplies}
              className="flex items-center gap-2 text-purple-600 font-semibold font-jost"
            >
              <span className={`md:text-xl ${showReplies ? "rotate-180" : "rotate-0"} duration-75`}>
                <IoCaretDownSharp />
              </span>
              <span>See {comment._count.replies} Replies</span>
            </button>
          ) : null}
          {showReplies && (
            <div>
              <h2 className="font-medium">Showing {comment._count.reactions} Replies:</h2>
              <div className=" mt-3 space-y-3">
                {/* {Array.from({ length: 3 }).map((_, index) => (
                  <ManageCommentCard  key={index} />
                ))} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCommentCard;
