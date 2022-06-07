import React, { useState } from "react";

import "./CoinSearch.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../routes/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const CoinItem = ({ coin }) => {
    const [searchText, setSearchText] = useState("");
    const [savedCoin, setSavedCoin] = useState(false);
    const { user } = UserAuth();

    const coinPath = doc(db, "users", `${user?.email}`);
    const saveCoin = async () => {
        if (user?.email) {
            setSavedCoin(!savedCoin);
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image,
                    rank: coin.market_cap_rank,
                    symbol: coin.symbol,
                }),
            });
        } else {
            alert("Please sign in to save a coin to your watch list");
        }
    };
    return (
        <tr className="tr-coin" key={coin.id}>
            <td onClick={saveCoin} className="mobile">
                <div className="stardiv">
                    {savedCoin ? (
                        <AiFillStar />
                    ) : (
                        <AiOutlineStar className="STAR" />
                    )}
                </div>
            </td>
            <td>{coin.market_cap_rank}</td>
            <td>
                <Link to={`/coin/${coin.id}`}>
                    <div className="coinsearch-table__image">
                        <img src={coin.image} alt={coin.id} />
                        {coin.name}
                    </div>
                </Link>
            </td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>
                {coin.price_change_24h > 0 ? (
                    <div
                        style={{
                            color: "green",
                        }}
                    >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                ) : (
                    <div style={{ color: "red" }}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                )}
            </td>
            <td className="mobile">{coin.total_volume.toLocaleString()}</td>
            <td className="mobile">${coin.market_cap.toLocaleString()}</td>
            <td className="mobile"></td>
            <td className="mobile">
                <Sparklines data={coin.sparkline_in_7d.price}>
                    <SparklinesLine color="blue" height="50px" />
                </Sparklines>
            </td>
        </tr>
    );
};

export default CoinItem;
