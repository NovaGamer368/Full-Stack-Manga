import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/mangas");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-form">
      <h1>LoginPage</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logIn}>Login</button>
      <Link to={"/create-account"}>Don't have an account? Create one here</Link>
    </div>
  );
};

export default LoginPage;
