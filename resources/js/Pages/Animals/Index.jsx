import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ animals }) {
    return (
        <AuthenticatedLayout
            header={
                <header className="flex items-center justify-center p-4 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-semibold text-gray-800">Animais</h2>
                </header>
            }
        >
            <Head title="Animais" />
            <main className="flex-1 overflow-y-auto bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    {animals && animals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {animals.map((animal) => (
                                <Link
                                    key={animal.id}
                                    href={route('animals.show', animal.id)}
                                    className="bg-white p-4 rounded shadow hover:shadow-md transition"
                                >
                                    {animal.photos && animal.photos.length > 0 ? (
                                        <img
                                            src={`/storage/${animal.photos[0]}`}
                                            alt={`Foto de ${animal.name}`}
                                            className="h-32 w-full object-cover rounded mb-2"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-32 w-full flex items-center justify-center bg-gray-200 rounded mb-2">
                                            Sem foto
                                        </div>
                                    )}
                                    <h3 className="text-lg font-semibold text-center">{animal.name}</h3>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhum animal cadastrado.</p>
                    )}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
