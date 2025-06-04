import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FinanceChart({ data }) {
    if (!data) return null;

    const labels = Object.keys(data);
    const custos = labels.map(m => data[m].custo);
    const receitas = labels.map(m => data[m].receita);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Custos',
                data: custos,
                backgroundColor: 'rgba(220, 38, 38, 0.7)',
            },
            {
                label: 'Receitas',
                data: receitas,
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 h-64 mt-4">
            <Bar data={chartData} options={options} />
        </div>
    );
}
