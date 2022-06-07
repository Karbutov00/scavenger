import React from "react";
import "./CoinSearch.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../routes/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import CoinItem from "./CoinItem";

const CoinSearch = ({ coins }) => {
    const [searchText, setSearchText] = useState("");
    const [savedCoin, setSavedCoin] = useState(false);
    const { user } = UserAuth();

    const coinPath = doc(db, "users", `${user?.email}`);
    const saveCoin = async () => {
        if (user?.email) {
            setSavedCoin(!savedCoin);
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coins.coin.id,
                    name: coins.coin.name,
                    image: coins.coin.image,
                    rank: coins.coin.market_cap_rank,
                    symbol: coins.coin.symbol,
                }),
            });
        } else {
            alert("Please sign in to save a coin to your watch list");
        }
    };

    return (
        <div className="coinsearch">
            <div className="coinsearch-searchContainer">
                <h1>Search Crypto</h1>
                <form>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search"
                    />
                </form>
            </div>
            <div className="table-start">
                <table>
                    <tr>
                        <th className="mobile"></th>
                        <th>#</th>
                        <th>Coin</th>
                        <th></th>
                        <th>Price</th>
                        <th>24h</th>
                        <th className="mobile">24h Volume</th>
                        <th className="mobile">Market</th>
                        <th className="mobile"></th>
                        <th className="mobile">7 Day</th>
                    </tr>
                    <tbody>
                        {coins
                            .filter((value) => {
                                if (searchText === "") {
                                    return value;
                                } else if (
                                    value.name
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                                ) {
                                    return value;
                                }
                            })
                            .splice(0, 10)
                            .map((coin) => {
                                return <CoinItem coin={coin} />;
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoinSearch;
