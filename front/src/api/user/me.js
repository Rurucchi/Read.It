export default async function getUserName() {
  const requestResult = await fetch(process.env.REACT_APP_SERVER + "/user/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: localStorage.getItem("token"),
    },
  });

  if (requestResult.status === 200) {
    return requestResult;
  } else {
    return false;
  }
}
