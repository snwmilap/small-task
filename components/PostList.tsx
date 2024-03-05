"use client";
import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-5xl font-bold my-10">Posts</h1>
      <div className="grid grid-cols-4 gap-10">
        {data.map((post) => (
          <div key={post.id} className="bg-white border p-4 shadow-md rounded-md">
            <h3 className="font-semibold text-xl mb-3  ">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      {error && (
        <div className="text-red-800">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
