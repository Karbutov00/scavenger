import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinPage from "./routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    const URL =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true";

    const [coins, setCoins] = useState([]);
    useEffect(() => {
        axios.get(URL).then((response) => {
            setCoins(response.data);
            // console.log(response.data);
        });
    }, [URL]);

    return (
        <div>
            <AuthContextProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home coins={coins} />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/coin/:coinId" element={<CoinPage />}>
                        <Route path=":coinId" />
                    </Route>
                </Routes>
                <Footer />
            </AuthContextProvider>
        </div>
    );
}

export default App;
