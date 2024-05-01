import React from "react";
import parse from "html-react-parser";

const BlogCard = ({ data }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const calculateTimeToRead = (content, readingSpeed) => {
    const wordCount = content.split(/\s+/).length;
    const timeToRead = Math.ceil(wordCount / readingSpeed);
    return timeToRead;
  };

  function htmlToPlainText(html) {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.textContent || element.innerText || "";
  }

  function calculateTimeToReadFromHTML(html, readingSpeed) {
    const plainTextContent = htmlToPlainText(html);
    return calculateTimeToRead(plainTextContent, readingSpeed);
  }

  const timeTaken = calculateTimeToReadFromHTML(data.content, 200);

  return (
    <>
      <div className="p-3 flex flex-col gap-2 w-2xl">
        <div className="flex items-center gap-3">
          <a href="">
            <img
              src={data.avatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover cursor-pointer"
            />
          </a>
          <div className="flex gap-2 items-center">
            <p className="cursor-pointer">{data.full_name} . </p>
            <p className="text-slate-500 text-sm">
              {new Date(data.created_at).toLocaleDateString("en-US", options)}
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <h3 className="font-bold text-xl cursor-pointer">{data.title}</h3>
            <div className="text-gray-600 cursor-pointer">
              {parse(`${data.content.slice(0, 250)}....`)}
            </div>
          </div>
          
          <div className="max-w-24">
            <img src={data.image} className="object-cover" alt="" />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-7">
          <div className="bg-gray-200 py-1 px-2 rounded-2xl text-sm w-fit cursor-pointer">
            <div>{data.name}</div>
          </div>
          <div className="text-sm text-gray-400">{timeTaken} min read</div>
        </div>

        <hr className="border-t border-gray-200" />
      </div>
    </>
  );
};

export default BlogCard;
