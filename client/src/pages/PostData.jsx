import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import parse from "html-react-parser";

const PostData = () => {
  const [postDetail, setPostDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handlePost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/blogs/getPost/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPostDetail(res.data.rows[0]);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    handlePost();
  }, [id]);

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

  const timeTaken = calculateTimeToReadFromHTML(postDetail.content, 200);

  return (
    <>
      <div>
        <Navbar />
        {loading ? (
          <p>Loading....</p>
        ) : (
          <div className="flex flex-col max-w-2xl mx-auto gap-7 mt-20">
            <h1 className="text-5xl font-bold post-title">
              {postDetail.title}
            </h1>

            <div className="flex items-center gap-4">
              <a href="">
                <img
                  src={postDetail.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              </a>
              <div className="flex  flex-col">
                <p className="font-semibold">{postDetail.full_name}</p>
                <div className="flex gap-2 text-sm">
                  <p className=" text-gray-500">{timeTaken} min read</p>
                  <p>.</p>
                  <p className=" text-slate-500">{new Date(postDetail.created_at).toLocaleDateString("en-US", options)}</p>
                </div>
              </div>
            </div>

            <div>
              <img src={postDetail.image} alt="" />
            </div>

            {postDetail.content ? (
              <div className="tiptap">{parse(postDetail.content)}</div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostData;
