import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChartComponent from './components/ChartComponent';

const App = () => {
    const [selectedCoin, setSelectedCoin] = useState('ethusdt');
    const [selectedInterval, setSelectedInterval] = useState('1m');

    const coins = [
        { value: 'ethusdt', label: 'ETH/USDT' },
        { value: 'bnbusdt', label: 'BNB/USDT' },
        { value: 'dotusdt', label: 'DOT/USDT' },
    ];

    const intervals = [
        { value: '1m', label: '1 Minute' },
        { value: '3m', label: '3 Minutes' },
        { value: '5m', label: '5 Minutes' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <motion.div
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-center mb-4">Cryptocurrency Chart</h1>

                <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-2 md:mb-0">
                        <label htmlFor="coinSelect" className="mr-2">Select Coin:</label>
                        <select
                            id="coinSelect"
                            value={selectedCoin}
                            onChange={(e) => setSelectedCoin(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        >
                            {coins.map((coin) => (
                                <option key={coin.value} value={coin.value}>
                                    {coin.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="intervalSelect" className="mr-2">Select Interval:</label>
                        <select
                            id="intervalSelect"
                            value={selectedInterval}
                            onChange={(e) => setSelectedInterval(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        >
                            {intervals.map((interval) => (
                                <option key={interval.value} value={interval.value}>
                                    {interval.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <ChartComponent coin={selectedCoin} interval={selectedInterval} />
            </motion.div>
        </div>
    );
};

export default App;
