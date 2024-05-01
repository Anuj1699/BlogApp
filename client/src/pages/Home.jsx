import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/blogs/getAllPosts",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setPosts(res.data.rows);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handlePost = async (data) => {
    navigate(`/postData/${data}`);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <section className="relative py-20 overflow-hidden">
          <div className="relative container px-4 mx-auto">
            <div className="max-w-xl lg:max-w-7xl mx-auto">
              <div className="flex flex-wrap -mx-4 mb-18 justify-center">
                <div className="w-full lg:w-1/2 px-4">
                  {posts.map((data) => {
                    return (
                      <div
                        key={data.post_id}
                        onClick={() => handlePost(data.post_id)}
                      >
                        <BlogCard data={data} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
