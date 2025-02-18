import React, { FC } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
interface IProps {
  src: string;
  onDeleteClick?(): void;
  onSelectClick?(image: string): void;
}
const GalleryImage: FC<IProps> = ({ src, onDeleteClick, onSelectClick }) => {
  const handelOnSelect = () => {
    onSelectClick && onSelectClick(src);
  };
  return (
    <div className=" group w-full aspect-square  overflow-hidden relative md:h-60">
      <img src={src} alt="" className="w-full h-full object-cover" />
      <div className=" group-hover:block hidden absolute left-0 bottom-0">
        <button
          type="button"
          className="flex items-center justify-center p-2 bg-red-500 text-white"
        >
          <BiSolidTrash size={20} />
        </button>
        <button
          type="button"
          onClick={handelOnSelect}
          className="flex items-center justify-center p-2 bg-green-400 text-white"
        >
          <IoMdCheckmark size={20} />
        </button>
      </div>
    </div>
  );
};

export default GalleryImage;
