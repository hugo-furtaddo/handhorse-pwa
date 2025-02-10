import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ animal }) {
    return (
        <>
            <Head title={animal.name} />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
                <h1 className="text-3xl font-bold mb-4">{animal.name}</h1>
                <p>
                    <strong>Raça:</strong> {animal.breed.name}
                </p>
                <p>
                    <strong>Data de Nascimento:</strong> {animal.birth_date}
                </p>
                <p>
                    <strong>Pai:</strong> {animal.father}
                </p>
                <p>
                    <strong>Mãe:</strong> {animal.mother}
                </p>
                <p>
                    <strong>Prole:</strong> {animal.progeny}
                </p>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Fotos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {animal.photos && animal.photos.length > 0 ? (
                            animal.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`/storage/${photo}`}
                                    alt={`Foto ${index + 1}`}
                                    className="object-cover rounded"
                                />
                            ))
                        ) : (
                            <p>Sem fotos</p>
                        )}
                    </div>
                </div>
                {/* Botão para voltar ao Dashboard */}
                <div className="mt-6">
                    <Link
                        href={route('dashboard')}
                        className="inline-block py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Voltar ao Dashboard
                    </Link>
                </div>
            </div>
        </>
    );
}
