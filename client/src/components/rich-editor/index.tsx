"use client";
import React, { FC, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import Tools from "./Tools";
import ImageGallery from "./ImageGallery";
import ImageProvider from "./ImageProvider";
import "@/styles/RichEditor.css";
interface IProps {
  onChange?(value: string): void;
  defaultValue?: string;
}
const extensions = [
  StarterKit,
  Underline,
  Image.configure({
    inline: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "Write Something...",
  }),
  Dropcursor.configure({
    color: "#6342f5",
  }),
  Document,
  Link.configure({
    openOnClick: false,
    autolink: false,
    linkOnPaste: true,
    HTMLAttributes: {
      target: "_blank",
      class: "text-blue-600",
    },
  }),
];

const RichEditor: FC<IProps> = ({ onChange, defaultValue }) => {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [value, setValue] = useState<string | undefined>("");
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "p-2 h-[80vh] prose prose-sm  md:prose-2xl mx-auto focus:outline-none  border-2 border-black rounded overflow-y-auto outline-none  ",
      },
    },
    injectCSS: false,
    autofocus: false,
    editable: true,
    immediatelyRender: false,
    content: defaultValue,
  });

  const onImageSelect = (image: string) => {
    editor?.chain().focus().setImage({ src: image, alt: "image can not loaded" }).run();
  };

  useEffect(() => {
    onChange && onChange(editor?.getHTML()!);
  }, [editor?.getHTML()]);

  return (
    <ImageProvider>
      <div className={`relative ${true ? "fixed inset-0 z-50 bg-white " : "w-full"}`}>
        <div className="stick top-0 bg-white z-50">
          <Tools editor={editor} onImageSelection={() => setShowImageGallery(true)} />
        </div>
        <div className="flex-1">
          <EditorContent editor={editor} />
        </div>
        <ImageGallery
          onSelect={onImageSelect}
          visible={showImageGallery}
          onClose={() => setShowImageGallery(false)}
        />
      </div>
    </ImageProvider>
  );
};

export default RichEditor;
