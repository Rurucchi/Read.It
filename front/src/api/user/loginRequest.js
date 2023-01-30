async function LoginRequest(name, password) {
  try {
    const data = { password, name };

    console.log(JSON.stringify(data));
    const result = await fetch(process.env.REACT_APP_SERVER + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((data) => data.json())
    .then((data) => localStorage.setItem("token", data.token));

    // SAVE INFOS
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default LoginRequest;
