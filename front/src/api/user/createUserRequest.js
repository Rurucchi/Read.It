async function CreateUserRequest(name, creds, password) {
  const data = { name, password, mail: creds };

  try {
    const result = await fetch(process.env.REACT_APP_SERVER + "/user/signin", {
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
