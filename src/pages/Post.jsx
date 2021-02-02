import { useEffect, useState } from "react";
import styled from "styled-components";
import PostForm from "../components/PostForm";
import PostItem from "../components/PostItem";
import { getAllPost } from "../services/postapi";
import "./Post.css";

function Post() {
  const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPost().then((res) => setPosts(res || []));
  }, []);

  return (
    <PostWrapper className="container">
      <PostForm setPosts={setPosts} posts={posts} />
      {posts.length > 0 &&
        posts.map((e, i) => {
          return (
            <PostItem
              setPosts={setPosts}
              key={i}
              postid={e.id}
              id={e.User.id}
              username={e.User.username}
              title={e.title}
              content={e.content}
              likeCount={e.like.length}
            ></PostItem>
          );
        })}
    </PostWrapper>
  );
}

export default Post;
