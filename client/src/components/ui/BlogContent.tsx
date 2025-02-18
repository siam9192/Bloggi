import React from "react";
interface IProps {
  content: string;
}
const BlogContent = ({ content }: IProps) => {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default BlogContent;
