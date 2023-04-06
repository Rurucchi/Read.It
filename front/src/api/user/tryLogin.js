import getUserName from "./me";

// login for context

export default async function tryLogin() {
  let result = await getUserName(localStorage.getItem("token"));
  if (result.status === 200) {
    return true;
  } else {
    return false;
  }
}
