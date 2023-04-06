export async function getPost(id) {
  let result;
  try {
    result = await fetch(process.env.REACT_APP_SERVER + "/post/view/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return await result.json();
  } catch (error) {
    console.log(error);
  }
}
