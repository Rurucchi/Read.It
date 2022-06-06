import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  // Usestates
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        username: name,
        password: password,
        mail: mail,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  // Changes
  const changeName = (e) => {
    setName(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeMail = (e) => {
    setMail(e.target.value);
  };



  // HTML
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form>
            <input
              type="text"
              placeholder="username"
              value={name}
              onChange={changeName}
            ></input>
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={changePassword}
            ></input>
            <input
              type="text"
              placeholder="mail"
              value={mail}
              onChange={changeMail}
            ></input>

            <button onClick={handleChange}>Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default SignIn;
