import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ animal, treatments = [], reproductionActivities = [] }) {
    const [showProcedures, setShowProcedures] = useState(false);
    const [showReproductions, setShowReproductions] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <header className="flex flex-col items-center justify-center p-4 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-semibold text-gray-800">Detalhes do Animal</h2>
                </header>
            }
        >
            <Head title={animal.name} />
            <main className="flex-1 mt-1 mb-16 bg-gray-100 overflow-y-auto">
                <div className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-6">
                    <h1 className="text-3xl font-bold text-center">{animal.name}</h1>
                    <div className="space-y-2 text-sm">
                        <p>
                            <strong>Raça:</strong> {animal.breed.name}
                        </p>
                        <p>
                            <strong>Sexo:</strong> {animal.sex === 'male' ? 'Macho' : 'Fêmea'}
                        </p>
                        <p>
                            <strong>Data de Nascimento:</strong>{' '}
                            {new Date(animal.birth_date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Pai:</strong> {animal.father}
                        </p>
                        <p>
                            <strong>Mãe:</strong> {animal.mother}
                        </p>
                        <p>
                            <strong>Prole:</strong> {animal.progeny || 'Não informada'}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Fotos</h2>
                        {animal.photos && animal.photos.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {animal.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={`/storage/${photo}`}
                                        alt={`Foto ${index + 1}`}
                                        className="object-cover w-full h-32 rounded"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">Sem fotos</p>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setShowProcedures(true)}
                            className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                        >
                            Procedimentos
                        </button>
                        <button
                            onClick={() => setShowReproductions(true)}
                            className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                        >
                            Reproduções
                        </button>
                        <Link
                            href={route('animals.edit', animal.id)}
                            className="flex-1 py-2 bg-yellow-500 text-white rounded text-center hover:bg-yellow-600 transition-colors duration-200"
                        >
                            Editar
                        </Link>
                    </div>
                </div>

                {/* Modal para procedimentos */}
                <Modal show={showProcedures} onClose={() => setShowProcedures(false)}>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Procedimentos de {animal.name}</h2>
                        {treatments && treatments.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {treatments.map((treatment) => (
                                    <div key={treatment.id} className="border rounded p-4">
                                        <p>
                                            <strong>Tipo:</strong> {treatment.treatment_type ? treatment.treatment_type.name : 'Tipo não informado'}
                                        </p>
                                        <p>
                                            <strong>Data:</strong> {new Date(treatment.date).toLocaleDateString()}
                                        </p>
                                        <p><strong>Detalhes:</strong></p>
                                        {treatment.details ? (
                                            <p className="text-sm">
                                                {treatment.details.type || treatment.details.procedimento || 'Sem detalhes'}
                                            </p>
                                        ) : (
                                            <p className="text-sm">Sem detalhes</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Não há procedimentos cadastrados para este animal.</p>
                        )}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowProcedures(false)}
                                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Modal para reproduções */}
                <Modal show={showReproductions} onClose={() => setShowReproductions(false)}>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Reproduções de {animal.name}</h2>
                        {reproductionActivities && reproductionActivities.length > 0 ? (
                            <div className="mt-4 space-y-2">
                                <h2 className="text-xl font-bold mb-2">Atividades de Reprodução</h2>
                                {reproductionActivities.map((rep) => (
                                    <div key={rep.id} className="border rounded p-2">
                                        <p><strong>Tipo:</strong> {rep.type}</p>
                                        <p>
                                            <strong>Data:</strong>{' '}
                                            {rep.date ? new Date(rep.date).toLocaleDateString() : '—'}
                                        </p>
                                        {rep.type === 'monta_natural' || rep.type === 'inseminacao' ? (
                                            <>
                                                <p>
                                                    <strong>Égua:</strong> {rep.egua ? rep.egua.name : rep.egua_name}
                                                </p>
                                                <p>
                                                    <strong>Cavalo:</strong> {rep.cavalo ? rep.cavalo.name : rep.cavalo_name}
                                                </p>
                                            </>
                                        ) : rep.type === 'transferencia' ? (
                                            <>
                                                <p>
                                                    <strong>Doadora:</strong> {rep.doadora ? rep.doadora.name : rep.doadora_name}
                                                </p>
                                                <p>
                                                    <strong>Cavalo:</strong> {rep.cavalo ? rep.cavalo.name : rep.cavalo_name}
                                                </p>
                                                <p>
                                                    <strong>Receptor:</strong> {rep.receptor ? rep.receptor.name : rep.receptor_name}
                                                </p>
                                            </>
                                        ) : rep.type === 'confirmacao_prenhes' ? (
                                            <>
                                                <p>
                                                    <strong>Animal:</strong> {rep.animal ? rep.animal.name : rep.animal_name}
                                                </p>
                                                <p>
                                                    <strong>Data Exame:</strong> {rep.date_exame ? new Date(rep.date_exame).toLocaleDateString() : '—'}
                                                </p>
                                                <p>
                                                    <strong>Data Provável:</strong> {rep.date_provavel ? new Date(rep.date_provavel).toLocaleDateString() : '—'}
                                                </p>
                                                <p>
                                                    <strong>Pai:</strong> {rep.pai ? rep.pai.name : rep.pai_name}
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Não há reproduções cadastradas para este animal.</p>
                        )}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowReproductions(false)}
                                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}