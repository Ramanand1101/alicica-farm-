import React, { useState } from "react";
import "../styles/Login.css";
import SignInForm from "../components/Signin";
import SignUpForm from "../components/Signup";

export default function Login() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Login">
        <SignUpForm />
        <SignInForm />
    </div>
  );
}
