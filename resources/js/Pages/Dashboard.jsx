import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import AnimalsCarousel from '@/Components/AnimalsCarousel';
import { Head } from '@inertiajs/react';

export default function Dashboard({ animals }) {
    return (
        <AuthenticatedLayout
            header={
                <header className="flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Dashboard
                    </h2>
                    <img
                        src="/handhorse.png"
                        alt="Logo da Handhorse"
                        className="h-10 w-auto mt-2 md:mt-0"
                        loading="lazy"
                    />
                </header>
            }
        >
            <Head title="Dashboard" />
            <main className="py-8 px-4 sm:px-6 lg:px-8">
                {/* Conteúdo centralizado e responsivo */}
                <Container>
                    <AnimalsCarousel animals={animals} />
                </Container>
            </main>
        </AuthenticatedLayout>
    );
}