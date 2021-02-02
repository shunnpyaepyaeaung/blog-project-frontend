import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import {
  postDelete,
  getAllPost,
  likePost,
  checklike,
  unlikePost,
} from "../services/postapi";

function PostItem({
  setPosts,
  postid,
  id,
  username,
  title,
  content,
  likeCount,
}) {
  const { currentUser } = useUser();
  const [checkUserLike, setCheckUserLike] = useState(false);

  const [like, setLike] = useState(likeCount);
  const isOwner = currentUser ? id === currentUser.id : false;
  const deletePost = async (postid) => {
    const token = localStorage.getItem("Token");
    await postDelete(postid, token);
    setPosts(await getAllPost());
  };

  const likepost = async (postid) => {
    await likePost(localStorage.getItem("Token"), postid);
    setCheckUserLike(await checklike(localStorage.getItem("Token"), postid));
    setLike((prev) => prev + 1);
  };

  const unlikepost = async (postid) => {
    await unlikePost(localStorage.getItem("Token"), postid);
    setCheckUserLike(await checklike(localStorage.getItem("Token"), postid));
    setLike((prev) => prev - 1);
  };

  useEffect(() => {
    checklike(localStorage.getItem("Token"), postid).then((res) =>
      setCheckUserLike(res)
    );
  }, [postid]);

  const likeButton = (
    <span className="left floated like">
      <i
        onClick={likepost.bind(this, postid)}
        className="heart outline icon"
      ></i>
      Like
    </span>
  );

  const unlikeButton = (
    <span className="left floated like">
      <i
        onClick={unlikepost.bind(this, postid)}
        className="heart icon"
        style={{ color: "#e84a5f" }}
      ></i>
      Unlike
    </span>
  );
  return (
    <div>
      <div className="ui card">
        <div className="content">
          {isOwner && (
            <i
              className="right floated x icon"
              onClick={deletePost.bind(this, postid)}
            ></i>
          )}

          <div className="header">{title}</div>
          <div className="meta dividing">{username}</div>
          <div className="description">
            <p>{content}</p>
          </div>
        </div>
        {currentUser && (
          <div class="extra content">
            {checkUserLike ? unlikeButton : likeButton}
            <div className="right floated">
              {like} {like < 2 ? "Like" : "Likes"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostItem;
