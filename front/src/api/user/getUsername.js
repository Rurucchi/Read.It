export default async function searchUserWithUID(id) {
  const requestResult = await fetch(
    process.env.REACT_APP_SERVER + "/user/get/" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (requestResult.status === 200) {
    return requestResult.json();
  } else {
    return false;
  }
}
