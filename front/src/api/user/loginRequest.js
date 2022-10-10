async function LoginRequest(creds, password) {
  try {
    const data = { password, mail: creds };

    const result = await fetch(process.env.REACT_APP_SERVER + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const content = await result.json();

    await localStorage.setItem("token", content.token);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default LoginRequest;
