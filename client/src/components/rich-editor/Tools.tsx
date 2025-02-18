import React, { ChangeEvent } from "react";
import {
  BiAlignLeft,
  BiAlignRight,
  BiBold,
  BiCodeAlt,
  BiCodeCurly,
  BiImage,
  BiItalic,
  BiStrikethrough,
  BiUnderline,
} from "react-icons/bi";
import { FaAlignCenter, FaList } from "react-icons/fa";
import ToolButton from "./ToolButton";
import { BubbleMenu, ChainedCommands, Editor } from "@tiptap/react";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import LinkForm from "./LinkForm";
import LinkEditForm from "./LinkEditForm";

const tools = [
  {
    task: "bold",
    icon: <BiBold size={20} />,
  },
  {
    task: "italic",
    icon: <BiItalic size={20} />,
  },
  {
    task: "underline",
    icon: <BiUnderline size={20} />,
  },
  {
    task: "strike",
    icon: <BiStrikethrough size={20} />,
  },
  {
    task: "code",
    icon: <BiCodeAlt size={20} />,
  },
  {
    task: "codeblock",
    icon: <BiCodeCurly size={20} />,
  },
  {
    task: "orderList",
    icon: <FaList size={20} />,
  },
  {
    task: "bulletList",
    icon: <MdOutlineFormatListBulleted size={20} />,
  },
  {
    task: "center",
    icon: <FaAlignCenter size={20} />,
  },
  {
    task: "left",
    icon: <BiAlignLeft size={20} />,
  },
  {
    task: "right",
    icon: <BiAlignRight size={20} />,
  },
  {
    task: "image",
    icon: <BiImage size={20} />,
  },
] as const;

const headingOptions = [
  {
    task: "p",
    value: "Paragraph",
  },
  {
    task: "h1",
    value: "Heading 1",
  },
  {
    task: "h2",
    value: "Heading 2",
  },
  {
    task: "h3",
    value: "Heading 3",
  },
] as const;

type TaskType = (typeof tools)[number]["task"];
type THeadingType = (typeof headingOptions)[number]["task"];
interface IProps {
  editor: Editor | null;
  onImageSelection?: () => void | any;
}
function Tools({ editor, onImageSelection }: IProps) {
  const chainMethods = (
    editor: Editor | null,
    command: (chain: ChainedCommands) => ChainedCommands,
  ) => {
    if (!editor) return;
    command(editor.chain().focus()).run();
  };

  const handelOnClick = (task: TaskType) => {
    switch (task) {
      case "bold":
        return chainMethods(editor, (chain) => chain.toggleBold());
      case "italic":
        return chainMethods(editor, (chain) => chain.toggleItalic());
      case "underline":
        return chainMethods(editor, (chain) => chain.toggleUnderline());
      case "strike":
        return chainMethods(editor, (chain) => chain.toggleStrike());
      case "code":
        return chainMethods(editor, (chain) => chain.toggleCode());
      case "codeblock":
        return chainMethods(editor, (chain) => chain.toggleCodeBlock());
      case "orderList":
        return chainMethods(editor, (chain) => chain.toggleOrderedList());
      case "bulletList":
        return chainMethods(editor, (chain) => chain.toggleBulletList());
      case "left":
        return chainMethods(editor, (chain) => chain.setTextAlign("left"));
      case "right":
        return chainMethods(editor, (chain) => chain.setTextAlign("right"));
      case "center":
        return chainMethods(editor, (chain) => chain.setTextAlign("center"));
      case "image":
        return onImageSelection && onImageSelection();
    }
  };

  const handelHeadingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as THeadingType;

    switch (value) {
      case "p":
        return chainMethods(editor, (chain) => chain.setParagraph());

      case "h1":
        return chainMethods(editor, (chain) =>
          chain.toggleHeading({
            level: 1,
          }),
        );
      case "h2":
        return chainMethods(editor, (chain) =>
          chain.toggleHeading({
            level: 2,
          }),
        );
      case "h3":
        return chainMethods(editor, (chain) =>
          chain.toggleHeading({
            level: 3,
          }),
        );
    }
  };

  const handelLinkSubmit = (link: string) => {
    if (!link) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: link }).run();
    }
  };

  const getSelectedHeading = (): THeadingType => {
    let result: THeadingType = "p";

    if (editor?.isActive("heading", { level: 1 })) {
      result = "h1";
    }
    if (editor?.isActive("heading", { level: 2 })) {
      result = "h2";
    }
    if (editor?.isActive("heading", { level: 3 })) {
      result = "h3";
    }

    return result;
  };

  const getInitialLink = () => {
    const att = editor?.getAttributes("link");
    if (att) return att.href;
  };

  return (
    <div className="flex items-center flex-wrap mb-2">
      <div>
        <select
          value={getSelectedHeading()}
          name=""
          id=""
          onChange={handelHeadingChange}
          className="p-2 border rounded-md"
        >
          {headingOptions.map((item) => (
            <option value={item.task} key={item.task}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
      <LinkForm onSubmit={handelLinkSubmit} />
      <BubbleMenu
        className=" absolute -bottom-28"
        editor={editor}
        shouldShow={({ editor }) => {
          const { selection } = editor.state;
          if (selection.from === selection.to) return false;
          const isLink = editor.isActive("link");
          return isLink;
        }}
      >
        <LinkEditForm onSubmit={handelLinkSubmit} initialLink={getInitialLink()} />
      </BubbleMenu>
      {tools.map(({ icon, task }) => {
        return (
          <ToolButton
            key={task}
            active={
              editor?.isActive(task) ||
              editor?.isActive({
                textAlign: task,
              })
            }
            onClick={() => handelOnClick(task)}
            children={icon}
          />
        );
      })}
    </div>
  );
}

export default Tools;
