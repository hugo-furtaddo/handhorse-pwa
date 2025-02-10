import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import DashboardMessage from '@/Components/DashboardMessage';
import AnimalsCarousel from '@/Components/AnimalsCarousel';
import { Head } from '@inertiajs/react';

export default function Dashboard({ animals }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <img src="/handhorse.png" alt="Handhorse Logo" className="h-10" />
                </div>
            }
        >
            <Head title="Dashboard" />
            {/* Envolva o conteúdo em um container consistente */}
            <Container>
                <DashboardMessage />
                <AnimalsCarousel animals={animals} />
            </Container>
        </AuthenticatedLayout>
    );
}
