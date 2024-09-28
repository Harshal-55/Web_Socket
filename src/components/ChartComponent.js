import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// Register all necessary components, including the candlestick chart types
Chart.register(...registerables, CandlestickController, CandlestickElement);

const ChartComponent = ({ coin, interval }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const localStorageKey = `${coin}-${interval}`;

    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            setChartData(JSON.parse(storedData));
        }

        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@kline_${interval}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const candle = data.k; // Access kline data

            const newCandle = {
                x: new Date(candle.t),
                o: parseFloat(candle.o),
                h: parseFloat(candle.h),
                l: parseFloat(candle.l),
                c: parseFloat(candle.c)
            };

            setChartData((prevData) => {
                const updatedData = [...prevData, newCandle];
                localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
                return updatedData;
            });
        };

        return () => {
            ws.close();
        };
    }, [coin, interval, localStorageKey]);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const chart = new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: `${coin} Price`,
                    data: chartData,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute',
                            tooltipFormat: 'MMM d, h:mm:ss a',
                            displayFormats: {
                                minute: 'MMM d, h:mm a'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USDT)'
                        }
                    }
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, [chartData]);

    return (
        <div className="w-full h-72">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartComponent;
