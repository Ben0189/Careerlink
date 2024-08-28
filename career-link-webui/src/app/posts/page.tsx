'use client'
import { useState } from "react";

interface PostDTO {
    userId: number;
    description: string;
    createdDate: Date;
    updatedDate: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Post/allpost`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data: PostDTO[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Fetch Posts</h1>
      <button
        onClick={fetchPosts}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Posts"}
      </button>

      {posts.length > 0 && (
        <ul className="mt-8 w-full max-w-md space-y-4">
          {posts.map((post) => (
            <li
              key={post.userId}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-lg font-bold mb-2">{post.userId}</h2>
              <p className="text-sm text-gray-800">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
