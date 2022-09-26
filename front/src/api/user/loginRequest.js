async function loginRequest(creds, password) {
  try {
    const data = { mail: creds, password };

    const result = await fetch(process.env.REACT_APP_SERVER, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const content = await result.json();
  } catch (error) {
    console.log(error);
  }
}

export default loginRequest;
