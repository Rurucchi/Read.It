async function deletePost(postid) {
  try {
    const result = await fetch(
      process.env.REACT_APP_SERVER + "/post/delete/" + postid,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}

export default deletePost;
