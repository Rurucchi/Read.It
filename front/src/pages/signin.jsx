import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  // Usestates
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/signin", {
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
              type="password"
              placeholder="password"
              value={password}
              onChange={changePassword}
            ></input>
            <input
              type="password"
              placeholder="confirm password"
              value={password2}
              onChange={changePassword2}
            ></input>
            <input
              type="text"
              placeholder="mail"
              value={mail}
              onChange={changeMail}
            ></input>

            <button onClick={handleChange}>Register</button>
          </form>
        </div>
        <div>
          <p>Alredy have an account?</p>
        </div>
      </header>
    </div>
  );
};

export default SignIn;
