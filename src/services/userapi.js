const axios = require("axios");

const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5004/api/user/register",
      { username, email, password },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

const getUser = async (userid) => {
  try {
    const response = await axios.get(
      `http://localhost:5004/api/user/getuser?userid=${userid}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const userDetail = async (token) => {
  const response = await axios.get(
    `http://localhost:5004/api/user/userdetail`,
    {
      headers: {
        "content-type": "application/json",
        token: token,
      },
    }
  );
  return response.data;
};

const login = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5004/api/user/login",
      {
        username,
        password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

const allUser = async () => {
  const response = await axios.get("http://localhost:5004/api/user/alluser");
  return response.data;
};

const deleteUser = async (userid) => {
  const response = await axios.delete(
    `http://localhost:5004/api/user/deleteuser?userid=${userid}`
  );
  return response.data;
};

module.exports = {
  registerUser,
  getUser,
  userDetail,
  login,
  allUser,
  deleteUser,
};
