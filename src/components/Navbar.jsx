import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await logout();
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <h3>Scavenger</h3>
                    </Link>
                </div>
                <div className="navbar-sign">
                    {user?.email ? (
                        <div className="navbar-sign">
                            <Link to="/account">
                                <h4>Account</h4>
                            </Link>
                            <h4
                                onClick={handleSignOut}
                                className="navbar-signup"
                            >
                                Sign Out
                            </h4>{" "}
                        </div>
                    ) : (
                        <div className="navbar-sign">
                            <Link to="/signin">
                                <h4>Sign In</h4>
                            </Link>
                            <Link to="/signup">
                                <h4 className="navbar-signup">Sign Up</h4>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
