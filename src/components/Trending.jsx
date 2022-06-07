import React from "react";
import "./Trending.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Trending = () => {
    const URL = "https://api.coingecko.com/api/v3/search/trending";
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        axios.get(URL).then((response) => {
            setTrending(response.data.coins);
        });
    }, []);
    return (
        <div className="trending">
            <div className="trending-title">Trending</div>
            <div className="trending-coins">
                {trending.slice(0, 6).map((coin) => {
                    return (
                        <div className="t-coin">
                            <div className="t-coin-img">
                                <img src={coin.item.small} alt="/" />
                            </div>
                            <div className="t-coin-title">
                                <h3>{coin.item.name}</h3>
                                <h4>{coin.item.symbol}</h4>
                            </div>
                            <div className="t-coin-price">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
                                    alt=""
                                />
                                <h4>{coin.item.price_btc.toFixed(8)}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Trending;
