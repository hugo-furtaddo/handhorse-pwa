import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Show({ animal, treatments = [], reproductionActivities = [] }) {
    const [showProcedures, setShowProcedures] = useState(false);
    const [showReproductions, setShowReproductions] = useState(false);

    return (
        <>
            <Head title={animal.name} />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6">
                {/* Botão Voltar para o Dashboard (ou para a tela anterior) */}
                <div className="mb-4">
                    <Link
                        href={route('dashboard')}
                        className="inline-block py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Voltar
                    </Link>
                </div>
                <h1 className="text-3xl font-bold mb-4">{animal.name}</h1>
                <div className="space-y-2">
                    <p>
                        <strong>Raça:</strong> {animal.breed.name}
                    </p>
                    <p>
                        <strong>Data de Nascimento:</strong> {new Date(animal.birth_date).toLocaleDateString()}
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

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-2">Fotos</h2>
                    {animal.photos && animal.photos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {animal.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`/storage/${photo}`}
                                    alt={`Foto ${index + 1}`}
                                    className="object-cover rounded"
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Sem fotos</p>
                    )}
                </div>

                <div className="flex justify-between items-center space-x-4">
                    <button
                        onClick={() => setShowProcedures(true)}
                        className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Ver Procedimentos
                    </button>
                    <button
                        onClick={() => setShowReproductions(true)}
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Ver Reproduções
                    </button>
                </div>
            </div>

            {/* Modal para exibir os procedimentos */}
            <Modal show={showProcedures} onClose={() => setShowProcedures(false)}>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Procedimentos de {animal.name}</h2>
                    {treatments && treatments.length > 0 ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {treatments.map((treatment) => (
                                <div key={treatment.id} className="border rounded p-4">
                                    <p>
                                        <strong>Tipo:</strong> {treatment.treatment_type.name}
                                    </p>
                                    <p>
                                        <strong>Data:</strong> {new Date(treatment.date).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Detalhes:</strong>
                                    </p>
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
                            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal para exibir as reproduções*/}
            <Modal show={showReproductions} onClose={() => setShowReproductions(false)}>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Reproduções de {animal.name}</h2>
                    {
                        reproductionActivities && reproductionActivities.length > 0 && (
                            <div className="mt-6 bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-bold mb-2">Atividades de Reprodução</h2>
                                {reproductionActivities.map((rep) => (
                                    <div key={rep.id} className="border rounded p-2 mb-2">
                                        <p><strong>Tipo:</strong> {rep.type}</p>
                                        <p><strong>Data:</strong> {rep.date ? new Date(rep.date).toLocaleDateString() : '—'}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </Modal>
        </>
    );
}
