import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";
const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("post")
        .select("post_id, title, description, image, author, pub_date, category")
        .order("pub_date", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
        return;
      }

      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading posts…</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-gray-500">No posts available.</p>;
  }

  return (
    <section id="articles" className="py-16 px-6 max-w-5xl mx-auto">
      {/* Blog Posts Header */}
      <div className="flex items-center h-40 mb-12">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-4xl bg-gradient-to-r from-blue-900 to-gray-800 bg-clip-text text-transparent font-extrabold">
          Blog Posts
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            image={post.image}
            title={post.title}
            description={post.description}
            author={post.author}
            date={new Date(post.pub_date).toLocaleDateString("en-US")}
            category={post.category}
            onClick={() => navigate(`/post/${post.post_id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default PostsList;
