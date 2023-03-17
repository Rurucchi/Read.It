export default async function getUserName(token) {
  const requestResult = await fetch(process.env.REACT_APP_SERVER + "/user/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });

  if (requestResult.status === 200) {
    return requestResult;
  } else {
    return false;
  }
}
