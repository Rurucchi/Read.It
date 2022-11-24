import getUserName from "../user/me";

async function createPost(title, content, topic) {
  try {
    // get username from db
    const username = getUserName();

    if (!username) {
      throw new Error("Bad token");
    } else {
      const data = { username, topic, title, content };

      const result = await fetch(process.env.REACT_APP_SERVER + "/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export default createPost;
