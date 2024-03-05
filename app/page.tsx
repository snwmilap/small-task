import PostList from "@/components/PostList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="xl:p-20 p-10">
      <PostList />
    </main>
  );
}
