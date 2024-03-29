async function CreateUserRequest(name, password) {
  const data = { name, password };

  try {
    const result = await fetch(process.env.REACT_APP_SERVER + "/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default CreateUserRequest;
