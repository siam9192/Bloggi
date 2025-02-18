import React, { ReactNode, useState } from "react";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { FaTrash } from "react-icons/fa";

interface IProps {
  node: any;
  editor: Editor;
  getPos: any;
}

const ImageNodeViewWrapperComponent = ({ node, editor, getPos }: IProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <NodeViewWrapper as="div" className="relative inline-block">
      <img
        src={node.attrs.src}
        alt="Image"
        draggable="true"
        className={`max-w-full cursor-pointer transition-all ${
          isSelected ? "border-4 border-blue-500" : "border-0"
        }`}
        onClick={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)} // Remove border when losing focus
        tabIndex={0} // Allows blur detection
      />
      {/* <button
        className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
        onClick={() => editor.chain().focus().deleteNode("image").run()}
      >
        <FaTrash/>
      </button> */}
    </NodeViewWrapper>
  );
};

export default ImageNodeViewWrapperComponent;
