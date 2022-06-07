import React from "react";
import SavedCoin from "../components/SavedCoin";
import "./Account.css";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Account = () => {
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
        <div className="account">
            <div className="account-header">
                <h2>Welcome, {user?.email}!</h2>

                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className="account-coin">
                <h1>Watch List</h1>
                <SavedCoin />
            </div>
        </div>
    );
};

export default Account;
