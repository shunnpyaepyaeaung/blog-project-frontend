const axios = require("axios");

const createPost = async (title, content, token) => {
  try {
    const response = await axios.post(
      "http://localhost:5004/api/post/addpost",
      {
        title,
        content,
        token,
      },
      {
        headers: {
          "content-type": "application/json",
          token: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

const likePost = async (token, postid) => {
  try {
    const response = await axios.get(
      `http://localhost:5004/api/post/like?postid=${postid}`,
      {
        headers: {
          "content-type": "application/json",
          token: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const unlikePost = async (token, postid) => {
  try {
    const response = await axios.get(
      `http://localhost:5004/api/post/unlike?postid=${postid}`,
      {
        headers: {
          "content-type": "application/json",
          token: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const checklike = async (token, postid) => {
  try {
    const response = await axios.get(
      `http://localhost:5004/api/post/checklike?postid=${postid}`,
      {
        headers: {
          "content-type": "application/json",
          token: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const postLike = async (postid) => {
  try {
    const response = await axios.get(
      `http://localhost:5004/api/post/viewpostlike?postid=${postid}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const postDelete = async (postid, token) => {
  try {
    const response = await axios.delete(
      `
      http://localhost:5004/api/post/deletepost?postid=${postid}
    `,
      {
        headers: {
          "content-type": "application/json",
          token: token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllPost = async () => {
  try {
    const response = await axios.get(`http://localhost:5004/api/post/allpost`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createPost,
  likePost,
  unlikePost,
  postLike,
  getAllPost,
  postDelete,
  checklike,
};
