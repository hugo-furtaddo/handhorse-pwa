import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimalsCarousel from '@/Components/AnimalsCarousel';

export default function Index({ animals }) {
    return (
        <AuthenticatedLayout>
            <Head title="Meus Animais" />
            <div className="px-4 py-5 space-y-6">
                <h1 className="text-2xl font-bold text-center">Meus Animais</h1>
                {animals && animals.length > 0 ? (
                    <>
                        <AnimalsCarousel animals={animals} />
                        <div className="grid grid-cols-2 gap-4">
                            {animals.map((animal) => (
                                <Link
                                    href={route('animals.show', animal.id)}
                                    key={animal.id}
                                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center p-3"
                                >
                                    {animal.photos && animal.photos.length > 0 ? (
                                        <img
                                            src={`/storage/${animal.photos[0]}`}
                                            alt={animal.name}
                                            className="h-24 w-full object-cover rounded"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-24 w-full flex items-center justify-center bg-gray-200 rounded">
                                            Sem foto
                                        </div>
                                    )}
                                    <span className="mt-2 font-semibold text-sm text-center">
                                        {animal.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Nenhum animal cadastrado.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
