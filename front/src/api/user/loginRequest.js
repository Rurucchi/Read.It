async function LoginRequest(name, password) {
  try {
    const data = { password, name };
    const result = await fetch(process.env.REACT_APP_SERVER + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => localStorage.setItem("token", data.token));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default LoginRequest;
