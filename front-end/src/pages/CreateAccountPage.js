import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/mangas");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="create-account-form">
      <h1>Create Account</h1>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to={"/login"}>Already have an account? Log in here</Link>
    </div>
  );
};

export default CreateAccountPage;
