// THIS FILE IS INTENDED TO TEST THE FUNCTIONNALITY OF THEE BACKEND. IT MAY ALSO BE USED FOR FRONT-END CALLS.

async function userCreate()


async function identifyUser(token) {
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
    throw new Error("Identify user function Failed!!!");
  }
}

