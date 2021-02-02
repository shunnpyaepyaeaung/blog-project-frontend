import useUser from "../hooks/useUser";
import { createPost, getAllPost } from "../services/postapi";
import "./PostForm.css";
function PostForm({ setPosts }) {
  const { currentUser } = useUser();
  const addPost = async (e) => {
    e.preventDefault();
    let title = e.target[0].value;
    let content = e.target[1].value;
    let token = localStorage.getItem("Token");
    // console.log(token);
    try {
      await createPost(title, content, token);
      setPosts(await getAllPost());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {currentUser && (
        <form className="ui form" onSubmit={addPost}>
          <div className="field">
            <label>Title</label>
            <input
              style={{ width: "400px" }}
              className="ten wide column"
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>
          <div className="field">
            <label>Content</label>
            <textarea rows="2"></textarea>
          </div>
          <button className="ui secondary button" type="submit">
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default PostForm;
