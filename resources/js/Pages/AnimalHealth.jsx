import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function AnimalHealth({ treatmentTypes, animals, treatments }) {
    // Obtem os flash messages (caso haja confirmação de sucesso)
    const { flash = {} } = usePage().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        animal_id: '',
        treatment_type_id: '',
        date: '',
        // Campos específicos para cada tratamento
        vermifugo_photo: null,
        vermifugo_type: '',
        vacina_photo: null,
        vacina_type: '',
        suplemento_photo: null,
        suplemento_type: '',
        procedimento: '',
    });

    const openModal = (treatmentType) => {
        console.log("Abrindo modal para:", treatmentType);
        setSelectedType(treatmentType);
        setData('treatment_type_id', treatmentType.id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('animal_id', data.animal_id);
        formData.append('treatment_type_id', data.treatment_type_id);
        formData.append('date', data.date);

        if (selectedType) {
            if (selectedType.name === 'Vermifugação') {
                if (data.vermifugo_photo) {
                    formData.append('vermifugo_photo', data.vermifugo_photo);
                }
                formData.append('vermifugo_type', data.vermifugo_type);
            }
            if (selectedType.name === 'Vacina') {
                if (data.vacina_photo) {
                    formData.append('vacina_photo', data.vacina_photo);
                }
                formData.append('vacina_type', data.vacina_type);
            }
            if (selectedType.name === 'Suplementação') {
                if (data.suplemento_photo) {
                    formData.append('suplemento_photo', data.suplemento_photo);
                }
                formData.append('suplemento_type', data.suplemento_type);
            }
            if (selectedType.name === 'Tratamento odontológico') {
                formData.append('procedimento', data.procedimento);
            }
            // Casqueamento não possui campos extras.
        }

        post(route('treatments.store'), formData, {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <Head title="Saúde Animal" />
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Botão Voltar para o Dashboard (ou para a tela anterior) */}
                <div className="mb-4">
                    <Link
                        href={route('dashboard')}
                        className="inline-block py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Voltar
                    </Link>
                </div>

                {/* Exibe flash message se houver confirmação */}
                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-6">Saúde Animal</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {treatmentTypes.map((type) => (
                        <div key={type.id} className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">{type.name}</h2>
                            <button
                                onClick={() => openModal(type)}
                                className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Cadastrar {type.name}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Tratamentos Cadastrados</h2>
                    {treatments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border">Animal</th>
                                        <th className="py-2 px-4 border">Tratamento</th>
                                        <th className="py-2 px-4 border">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {treatments.map((treatment) => (
                                        <tr key={treatment.id}>
                                            <td className="py-2 px-4 border">{treatment.animal.name}</td>
                                            <td className="py-2 px-4 border">{treatment.treatment_type.name}</td>
                                            <td className="py-2 px-4 border">
                                                {new Date(treatment.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Nenhum tratamento cadastrado.</p>
                    )}
                </div>
            </div>

            {/* Modal de Cadastro */}
            <Modal show={modalOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-4">Cadastrar {selectedType?.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Animal</label>
                        <select
                            value={data.animal_id}
                            onChange={(e) => setData('animal_id', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        >
                            <option value="">Selecione um animal</option>
                            {animals.map((animal) => (
                                <option key={animal.id} value={animal.id}>
                                    {animal.name}
                                </option>
                            ))}
                        </select>
                        {errors.animal_id && <div className="text-red-500 text-sm">{errors.animal_id}</div>}
                    </div>
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

                    {selectedType && selectedType.name === 'Vermifugação' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tipo de Vermifugo</label>
                                <input
                                    type="text"
                                    value={data.vermifugo_type}
                                    onChange={(e) => setData('vermifugo_type', e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                                {errors.vermifugo_type && <div className="text-red-500 text-sm">{errors.vermifugo_type}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Foto do Vermifugo</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('vermifugo_photo', e.target.files[0])}
                                    className="mt-1 block w-full"
                                />
                                {errors.vermifugo_photo && <div className="text-red-500 text-sm">{errors.vermifugo_photo}</div>}
                            </div>
                        </>
                    )}

                    {selectedType && selectedType.name === 'Vacina' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tipo de Vacina</label>
                                <input
                                    type="text"
                                    value={data.vacina_type}
                                    onChange={(e) => setData('vacina_type', e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                                {errors.vacina_type && <div className="text-red-500 text-sm">{errors.vacina_type}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Foto da Vacina</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('vacina_photo', e.target.files[0])}
                                    className="mt-1 block w-full"
                                />
                                {errors.vacina_photo && <div className="text-red-500 text-sm">{errors.vacina_photo}</div>}
                            </div>
                        </>
                    )}

                    {selectedType && selectedType.name === 'Suplementação' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tipo de Suplemento</label>
                                <input
                                    type="text"
                                    value={data.suplemento_type}
                                    onChange={(e) => setData('suplemento_type', e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                                {errors.suplemento_type && <div className="text-red-500 text-sm">{errors.suplemento_type}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Foto do Suplemento</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('suplemento_photo', e.target.files[0])}
                                    className="mt-1 block w-full"
                                />
                                {errors.suplemento_photo && <div className="text-red-500 text-sm">{errors.suplemento_photo}</div>}
                            </div>
                        </>
                    )}

                    {selectedType && selectedType.name === 'Tratamento odontológico' && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Procedimento</label>
                            <textarea
                                value={data.procedimento}
                                onChange={(e) => setData('procedimento', e.target.value)}
                                className="mt-1 block w-full border rounded p-2"
                            ></textarea>
                            {errors.procedimento && <div className="text-red-500 text-sm">{errors.procedimento}</div>}
                        </div>
                    )}

                    {/* Casqueamento não possui campos extras */}

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
        </>
    );
}
