async function newpost(title, content) {
  const data = { user, topic, title, content };

  try {
    const result = await fetch(process.env.REACT_APP_SERVER + "/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
