import React, { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ animal, breeds }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: animal.name || '',
        breed_id: animal.breed_id || '',
        sex: animal.sex || 'female',
        birth_date: animal.birth_date || '',
        father: animal.father || '',
        mother: animal.mother || '',
        progeny: animal.progeny || '',
        photos: [],
    });

    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        setData('photos', e.target.files);
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('name', data.name);
        formData.append('breed_id', data.breed_id);
        formData.append('sex', data.sex);
        formData.append('birth_date', data.birth_date);
        formData.append('father', data.father);
        formData.append('mother', data.mother);
        formData.append('progeny', data.progeny);

        if (data.photos && data.photos.length > 0) {
            for (let i = 0; i < data.photos.length; i++) {
                formData.append('photos[]', data.photos[i]);
            }
        }

        post(route('animals.update', animal.id), formData, { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <header className="bg-white shadow fixed top-0 inset-x-0 z-50 p-4 border-b border-gray-100 flex items-center justify-center">
                    <h2 className="text-xl font-semibold text-gray-400">Editar Animal</h2>
                </header>
            }
        >
            <Head title="Editar Animal" />
            <div className="flex-1 pt-1 pb-6 bg-gray-0">
                <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Editar {animal.name}</h1>
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-gray-700">Nome</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Raça</label>
                            <select
                                value={data.breed_id}
                                onChange={(e) => setData('breed_id', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            >
                                <option value="">Selecione a raça</option>
                                {breeds.map((breed) => (
                                    <option key={breed.id} value={breed.id}>
                                        {breed.name}
                                    </option>
                                ))}
                            </select>
                            {errors.breed_id && <div className="text-red-500 text-sm mt-1">{errors.breed_id}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Sexo</label>
                            <select
                                value={data.sex}
                                onChange={(e) => setData('sex', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            >
                                <option value="female">Fêmea</option>
                                <option value="male">Macho</option>
                            </select>
                            {errors.sex && <div className="text-red-500 text-sm mt-1">{errors.sex}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Data de Nascimento</label>
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.birth_date && <div className="text-red-500 text-sm mt-1">{errors.birth_date}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Pai</label>
                            <input
                                type="text"
                                value={data.father}
                                onChange={(e) => setData('father', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.father && <div className="text-red-500 text-sm mt-1">{errors.father}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mãe</label>
                            <input
                                type="text"
                                value={data.mother}
                                onChange={(e) => setData('mother', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.mother && <div className="text-red-500 text-sm mt-1">{errors.mother}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Prole</label>
                            <textarea
                                value={data.progeny}
                                onChange={(e) => setData('progeny', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            ></textarea>
                            {errors.progeny && <div className="text-red-500 text-sm mt-1">{errors.progeny}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Novas Fotos</label>
                            <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <button
                                type="button"
                                onClick={openFileDialog}
                                className="mt-1 block py-2 px-4 bg-green-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Selecionar Fotos
                            </button>
                            {errors.photos && <div className="text-red-500 text-sm mt-1">{errors.photos}</div>}
                        </div>
                        <hr className="my-6" />
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
