import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

export default function FinanceChart({ data }) {
    if (!data) return null;

    const labels = Object.keys(data);
    const custos = labels.map(m => data[m].custo);
    const receitas = labels.map(m => data[m].receita);
    const lucro = labels.map((m) => data[m].receita - data[m].custo);

    const chartData = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'Custos',
                data: custos,
                backgroundColor: 'rgba(220, 38, 38, 0.7)',
                stack: 'totals',
            },
            {
                type: 'bar',
                label: 'Receitas',
                data: receitas,
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                stack: 'totals',
            },
            {
                type: 'line',
                label: 'Lucro',
                data: lucro,
                borderColor: 'rgba(37, 99, 235, 1)',
                backgroundColor: 'rgba(37, 99, 235, 0.4)',
                fill: false,
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
            y1: {
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 h-64 mt-4">
            <Chart type="bar" data={chartData} options={options} />
        </div>
    );
}
