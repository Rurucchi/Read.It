async function editPost(title, content, topic, embed, postid) {
  try {
    const data = { topic, title, content, embed };

    const result = await fetch(
      process.env.REACT_APP_SERVER + "/post/edit/" + postid,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default editPost;
