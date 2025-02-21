import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ breeds }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        breed_id: '',
        birth_date: '',
        father: '',
        mother: '',
        progeny: '',
        photos: [],
    });

    const handleFileChange = (e) => {
        setData('photos', e.target.files);
    };

    const submit = (e) => {
        e.preventDefault();

        // Cria um FormData para tratar uploads
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('breed_id', data.breed_id);
        formData.append('birth_date', data.birth_date);
        formData.append('father', data.father);
        formData.append('mother', data.mother);
        formData.append('progeny', data.progeny);

        if (data.photos.length > 0) {
            for (let i = 0; i < data.photos.length; i++) {
                formData.append('photos[]', data.photos[i]);
            }
        }

        post(route('animals.store'), formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800"></h2>} >
            <Head title="Cadastrar Animal" />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">Cadastro de Animal</h1>
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Raça</label>
                        <select
                            value={data.breed_id}
                            onChange={e => setData('breed_id', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        >
                            <option value="">Selecione a raça</option>
                            {breeds.map(breed => (
                                <option key={breed.id} value={breed.id}>
                                    {breed.name}
                                </option>
                            ))}
                        </select>
                        {errors.breed_id && <div className="text-red-500 text-sm">{errors.breed_id}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Data de Nascimento</label>
                        <input
                            type="date"
                            value={data.birth_date}
                            onChange={e => setData('birth_date', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Pai</label>
                        <input
                            type="text"
                            value={data.father}
                            onChange={e => setData('father', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.father && <div className="text-red-500 text-sm">{errors.father}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Mãe</label>
                        <input
                            type="text"
                            value={data.mother}
                            onChange={e => setData('mother', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.mother && <div className="text-red-500 text-sm">{errors.mother}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Prole</label>
                        <textarea
                            value={data.progeny}
                            onChange={e => setData('progeny', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        ></textarea>
                        {errors.progeny && <div className="text-red-500 text-sm">{errors.progeny}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Fotos</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 block w-full"
                        />
                        {errors.photos && <div className="text-red-500 text-sm">{errors.photos}</div>}
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
