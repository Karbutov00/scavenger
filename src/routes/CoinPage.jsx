import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useParams } from "react-router-dom";
import "./CoinPage.css";
import DOMPurify from "dompurify";

const CoinPage = () => {
    const [coin, setCoin] = useState({});
    const params = useParams();
    const URL = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;
    useEffect(() => {
        axios.get(URL).then((response) => setCoin(response.data));
    }, [URL]);
    return (
        <div className="coinpage">
            <div className="coinpage-header">
                <img src={coin?.image?.large} alt="/" />
                <div className="coinpage-title">
                    <h2>{coin?.name} Price</h2>
                    <h4>{coin?.symbol?.toUpperCase()} / USD</h4>
                </div>
            </div>
            <div className="coinpage-market">
                <div className="coinpage-price">
                    <div className="price-title">
                        <h2>
                            {coin?.market_data?.current_price ? (
                                <p>
                                    $
                                    {coin.market_data.current_price.usd.toLocaleString()}
                                </p>
                            ) : (
                                <p>N/A</p>
                            )}
                        </h2>
                        <h5>7 Day</h5>
                    </div>
                    <div className="price-sparkLines">
                        <Sparklines data={coin.market_data?.sparkline_7d.price}>
                            <SparklinesLine color="blue" />
                        </Sparklines>
                    </div>
                    <div className="cap-volume">
                        <div className="cap">
                            <h4>Market Cap</h4>
                            {coin.market_data?.market_cap ? (
                                <p>
                                    $
                                    {coin.market_data.market_cap.usd.toLocaleString()}
                                </p>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                        <div className="volume">
                            <h4>Volume (24H)</h4>
                            {coin.market_data?.market_cap ? (
                                <p>
                                    {coin.market_data.total_volume.usd.toLocaleString()}
                                </p>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                    </div>
                    <div className="high-low">
                        <div className="high">
                            <h4>24H High</h4>
                            {coin.market_data?.high_24h ? (
                                <p>
                                    $
                                    {coin.market_data.high_24h.usd.toLocaleString()}
                                </p>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                        <div className="volume">
                            <h4>24H Low</h4>
                            {coin.market_data?.low_24h ? (
                                <p>
                                    $
                                    {coin.market_data.low_24h.usd.toLocaleString()}
                                </p>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="coinpage-stats">
                    <div className="stats-title">
                        <h2>Market Stats</h2>
                    </div>
                    <div className="stats-header">
                        <div className="stats-rank">
                            <h4>Market Rank</h4>
                            {coin.market_cap_rank}
                        </div>
                        <div className="stats-algo">
                            <h4>Hashing Algorithm</h4>
                            {coin.hashing_algorithm ? (
                                <p>{coin.hashing_algorithm}</p>
                            ) : null}
                        </div>
                        <div className="stats-trust">
                            <h4>Trust Score</h4>
                            {coin.tickers ? (
                                <p>{coin.liquidity_score.toFixed(2)}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="stats-header">
                        <div className="stats-rank">
                            <h4>24 Hour</h4>
                            {coin.market_data ? (
                                <p>
                                    {coin.market_data.price_change_percentage_24h.toFixed(
                                        2
                                    )}
                                    %
                                </p>
                            ) : null}
                        </div>
                        <div className="stats-algo">
                            <h4>7 Day</h4>
                            {coin.market_data ? (
                                <p>
                                    {coin.market_data.price_change_percentage_7d.toFixed(
                                        2
                                    )}
                                    %
                                </p>
                            ) : null}
                        </div>
                        <div className="stats-trust">
                            <h4>14 Day</h4>
                            {coin.market_data ? (
                                <p>
                                    {coin.market_data.price_change_percentage_14d.toFixed(
                                        2
                                    )}
                                    %
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="stats-header">
                        <div className="stats-rank">
                            <h4>30 Day</h4>
                            {coin.market_data ? (
                                <p>
                                    {coin.market_data.price_change_percentage_30d.toFixed(
                                        2
                                    )}
                                    %
                                </p>
                            ) : null}
                        </div>
                        <div className="stats-algo">
                            <h4>60 Day</h4>
                            {coin.market_data ? (
                                <p>
                                    {coin.market_data.price_change_percentage_60d.toFixed(
                                        2
                                    )}
                                    %
                                </p>
                            ) : null}
                        </div>
                        <div className="stats-trust">
                            <h4>1 Year</h4>
                            {coin.market_data ? (
                                <p>
                                    {coin.market_data.price_change_percentage_1y.toFixed(
                                        2
                                    )}
                                    %
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-container">
                <div className="about-title">
                    <h2>About {coin.name}</h2>
                </div>
                <div className="about-body">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                coin.description ? coin.description.en : ""
                            ),
                        }}
                    ></p>
                </div>
            </div>
        </div>
    );
};

export default CoinPage;
