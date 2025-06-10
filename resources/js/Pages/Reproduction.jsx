import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Reproduction({ animals, reproductions }) {
    const { flash = {} } = usePage().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [currentType, setCurrentType] = useState(null);
    
    // Form data
    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        date: '',
        // Monta/Inseminação
        useEguaRegistered: false,
        egua_id: '',
        egua_name: '',
        useCavaloRegistered: false,
        cavalo_id: '',
        cavalo_name: '',
        // Transferência
        useDoadoraRegistered: false,
        doadora_id: '',
        doadora_name: '',
        useReceptorRegistered: false,
        receptor_id: '',
        receptor_name: '',
        // Confirmação
        useAnimalRegistered: false,
        animal_id: '',
        animal_name: '',
        date_exame: '',
        date_provavel: '',
        usePaiRegistered: false,
        pai_id: '',
        pai_name: '',
    });

    const openModal = (type) => {
        setCurrentType(type);
        setData('type', type);
        setModalOpen(true);
    };

    const closeModal = () => {
        reset();
        setModalOpen(false);
        setCurrentType(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reproduction.store'), {
            onSuccess: () => closeModal(),
        });
    };

    // Cards de modalidades
    const modalities = [
        { key: 'monta_natural', name: 'Monta Natural' },
        { key: 'inseminacao', name: 'Inseminação' },
        { key: 'transferencia', name: 'Transferência de Embrião' },
        { key: 'confirmacao_prenhes', name: 'Confirmação de Prenhes' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Reprodução" />
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-6">Reprodução</h1>
                
                {/* Modalidades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modalities.map((m) => (
                        <div key={m.key} className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
                            <h2 className="text-xl font-semibold mb-4">{m.name}</h2>
                            <button
                                onClick={() => openModal(m.key)}
                                className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Cadastrar
                            </button>
                        </div>
                    ))}
                </div>

                {/* Listagem das reproduções cadastradas */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Reproduções Cadastradas</h2>
                    {reproductions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border">Tipo</th>
                                        <th className="py-2 px-4 border">Data</th>
                                        <th className="py-2 px-4 border">Detalhes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reproductions.map((rep) => (
                                        <tr key={rep.id}>
                                            <td className="py-2 px-4 border">{rep.type}</td>
                                            <td className="py-2 px-4 border">
                                                {rep.date ? new Date(rep.date).toLocaleDateString() : '—'}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {(() => {
                                                    // Monta Natural / Inseminação
                                                    if (rep.type === 'monta_natural' || rep.type === 'inseminacao') {
                                                        const egua = rep.egua ? rep.egua.name : rep.egua_name;
                                                        const cavalo = rep.cavalo ? rep.cavalo.name : rep.cavalo_name;
                                                        return (
                                                            <div className="space-y-1">
                                                                <p><strong>Égua:</strong> {egua}</p>
                                                                <p><strong>Cavalo:</strong> {cavalo}</p>
                                                            </div>
                                                        );
                                                    }
                                                    // Transferência de Embrião
                                                    if (rep.type === 'transferencia') {
                                                        const doadora = rep.doadora ? rep.doadora.name : rep.doadora_name;
                                                        const cavalo = rep.cavalo ? rep.cavalo.name : rep.cavalo_name;
                                                        const receptor = rep.receptor ? rep.receptor.name : rep.receptor_name;
                                                        return (
                                                            <div className="space-y-1">
                                                                <p><strong>Doadora:</strong> {doadora}</p>
                                                                <p><strong>Cavalo:</strong> {cavalo}</p>
                                                                <p><strong>Receptor:</strong> {receptor}</p>
                                                            </div>
                                                        );
                                                    }
                                                    // Confirmação de prenhes
                                                    if (rep.type === 'confirmacao_prenhes') {
                                                        const animal = rep.animal ? rep.animal.name : rep.animal_name;
                                                        const pai = rep.pai ? rep.pai.name : rep.pai_name;
                                                        return (
                                                            <div className="space-y-1">
                                                                <p><strong>Animal:</strong> {animal}</p>
                                                                <p><strong>Data Exame:</strong> {rep.date_exame ? new Date(rep.date_exame).toLocaleDateString() : '—'}</p>
                                                                <p><strong>Data Provável:</strong> {rep.date_provavel ? new Date(rep.date_provavel).toLocaleDateString() : '—'}</p>
                                                                <p><strong>Pai:</strong> {pai}</p>
                                                            </div>
                                                        );
                                                    }
                                                    return '—';
                                                })()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Nenhuma reprodução cadastrada.</p>
                    )}
                </div>
            </div>

            {/* Modal para cadastro de reprodução */}
            <Modal show={modalOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-4">
                    Cadastrar {currentType === 'monta_natural' && 'Monta Natural'}
                    {currentType === 'inseminacao' && 'Inseminação'}
                    {currentType === 'transferencia' && 'Transferência de Embrião'}
                    {currentType === 'confirmacao_prenhes' && 'Confirmação de Prenhes'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" value={data.type} onChange={() => {}} />

                    {/* Data principal */}
                    {currentType !== 'confirmacao_prenhes' && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Data</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="mt-1 block w-full border rounded p-2"
                            />
                            {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                        </div>
                    )}

                    {currentType === 'monta_natural' || currentType === 'inseminacao' ? (
                        <>
                            {/* Monta Natural / Inseminação */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Égua</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.useEguaRegistered}
                                        onChange={(e) => setData('useEguaRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Égua cadastrada</span>
                                </div>
                                {data.useEguaRegistered ? (
                                    <select
                                        value={data.egua_id}
                                        onChange={(e) => setData('egua_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals
                                            .filter((animal) => animal.sex === 'female')
                                            .map((animal) => (
                                                <option key={animal.id} value={animal.id}>
                                                    {animal.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.egua_name}
                                        onChange={(e) => setData('egua_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome da égua"
                                    />
                                )}
                                {errors.egua_id && <div className="text-red-500 text-sm">{errors.egua_id}</div>}
                                {errors.egua_name && <div className="text-red-500 text-sm">{errors.egua_name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Cavalo</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.useCavaloRegistered}
                                        onChange={(e) => setData('useCavaloRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Cavalo cadastrado</span>
                                </div>
                                {data.useCavaloRegistered ? (
                                    <select
                                        value={data.cavalo_id}
                                        onChange={(e) => setData('cavalo_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals
                                            .filter((animal) => animal.sex === 'male')
                                            .map((animal) => (
                                                <option key={animal.id} value={animal.id}>
                                                    {animal.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.cavalo_name}
                                        onChange={(e) => setData('cavalo_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome do cavalo"
                                    />
                                )}
                            </div>
                        </>
                    ) : null}

                    {currentType === 'transferencia' && (
                        <>
                            {/* Transferência de Embrião */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Doadora</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.useDoadoraRegistered}
                                        onChange={(e) => setData('useDoadoraRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Doadora cadastrada</span>
                                </div>
                                {data.useDoadoraRegistered ? (
                                    <select
                                        value={data.doadora_id}
                                        onChange={(e) => setData('doadora_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals
                                            .filter((animal) => animal.sex === 'female')
                                            .map((animal) => (
                                                <option key={animal.id} value={animal.id}>
                                                    {animal.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.doadora_name}
                                        onChange={(e) => setData('doadora_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome da doadora"
                                    />
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Cavalo</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.useCavaloRegistered}
                                        onChange={(e) => setData('useCavaloRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Cavalo cadastrado</span>
                                </div>
                                {data.useCavaloRegistered ? (
                                    <select
                                        value={data.cavalo_id}
                                        onChange={(e) => setData('cavalo_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals
                                            .filter((animal) => animal.sex === 'male')
                                            .map((animal) => (
                                                <option key={animal.id} value={animal.id}>
                                                    {animal.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.cavalo_name}
                                        onChange={(e) => setData('cavalo_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome do cavalo"
                                    />
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Receptor</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.useReceptorRegistered}
                                        onChange={(e) => setData('useReceptorRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Receptor cadastrado</span>
                                </div>
                                {data.useReceptorRegistered ? (
                                    <select
                                        value={data.receptor_id}
                                        onChange={(e) => setData('receptor_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals
                                            .filter((animal) => animal.sex === 'female')
                                            .map((animal) => (
                                                <option key={animal.id} value={animal.id}>
                                                    {animal.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.receptor_name}
                                        onChange={(e) => setData('receptor_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome do receptor"
                                    />
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Data</label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                            </div>
                        </>
                    )}

                    {currentType === 'confirmacao_prenhes' && (
                        <>
                            {/* Confirmação de prenhes */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Nome do Animal</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.useAnimalRegistered}
                                        onChange={(e) => setData('useAnimalRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Animal cadastrado</span>
                                </div>
                                {data.useAnimalRegistered ? (
                                    <select
                                        value={data.animal_id}
                                        onChange={(e) => setData('animal_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals
                                            .filter((animal) => animal.sex === 'male')
                                            .map((animal) => (
                                                <option key={animal.id} value={animal.id}>
                                                    {animal.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.animal_name}
                                        onChange={(e) => setData('animal_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome do Animal"
                                    />
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Data Provável</label>
                                <input
                                    type="date"
                                    value={data.date_provavel}
                                    onChange={(e) => setData('date_provavel', e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Data de Exame</label>
                                <input
                                    type="date"
                                    value={data.date_exame}
                                    onChange={(e) => setData('date_exame', e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Nome do Pai</label>
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.usePaiRegistered}
                                        onChange={(e) => setData('usePaiRegistered', e.target.checked)}
                                    />
                                    <span>Utilizar Cavalo cadastrado</span>
                                </div>
                                {data.usePaiRegistered ? (
                                    <select
                                        value={data.pai_id}
                                        onChange={(e) => setData('pai_id', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                    >
                                        <option value="">Selecione</option>
                                        {animals.map((animal) => (
                                            <option key={animal.id} value={animal.id}>
                                                {animal.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.pai_name}
                                        onChange={(e) => setData('pai_name', e.target.value)}
                                        className="mt-1 block w-full border rounded p-2"
                                        placeholder="Nome do Pai"
                                    />
                                )}
                            </div>
                        </>
                    )}

                    {/* Exibição de erros gerais */}
                    {errors.type && <div className="text-red-500 text-sm mb-2">{errors.type}</div>}
                    
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mr-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
