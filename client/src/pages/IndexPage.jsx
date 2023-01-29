import { useEffect, useState } from "react";
import Posts from "../components/Posts";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4001/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          <Posts {...post} />;
        })}
    </>
  );
}
