import React from "react";
import "./Signin.css";
import { signIn, UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
    const { signIn } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signIn(email, password);
            navigate("/account");
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };
    return (
        <div className="signin">
            <div className="signin-container">
                <h1>Sign In</h1>
                <p>Email</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    type="email"
                />
                <p>Password</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    type="password"
                />
            </div>
            <div className="signin-button">
                <button onClick={handleSubmit}>Sign In</button>
            </div>
            <div className="account-check">
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
