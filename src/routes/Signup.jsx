import React from "react";
import "./Signin.css";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const { signUp } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/account");
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };

    return (
        <div className="signin">
            <div className="signin-container">
                <h1>Sign Up</h1>
                {error ? <p>{error}</p> : null}
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
                <button onClick={handleSubmit}>Sign Up</button>
            </div>
            <div className="account-check">
                <p>
                    Already have an account? <a href="/signin">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
