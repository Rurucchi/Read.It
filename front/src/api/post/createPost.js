async function createPost(title, content, topic) {
  try {
    const data = { topic, title, content };

    const result = await fetch(process.env.REACT_APP_SERVER + "/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    console.log(data);

    return true;
  } catch (error) {
    console.log(error);
  }
}

export default createPost;
