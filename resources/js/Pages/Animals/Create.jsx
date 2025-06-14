import React, { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create({ breeds }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        breed_id: '',
        sex: 'female',
        birth_date: '',
        father: '',
        mother: '',
        progeny: '',
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

        // Cria um FormData para tratar uploads
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('breed_id', data.breed_id);
        formData.append('sex', data.sex);
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
        <AuthenticatedLayout>
            <Head title="Cadastrar Animal" />
            <div className="flex-1 pt-2 pb-6">
                <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Novo Animal</h1>
                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* Outros campos já existentes */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Nome</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div className="mb-4">
                        <label className="block text-gray-700">Raça</label>
                        <select
                            value={data.breed_id}
                            onChange={e => setData('breed_id', e.target.value)}
                            className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                        >
                            <option value="">Selecione a raça</option>
                            {breeds.map(breed => (
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
                            onChange={e => setData('sex', e.target.value)}
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
                                onChange={e => setData('birth_date', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.birth_date && <div className="text-red-500 text-sm mt-1">{errors.birth_date}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Pai</label>
                            <input
                                type="text"
                                value={data.father}
                                onChange={e => setData('father', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.father && <div className="text-red-500 text-sm mt-1">{errors.father}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Mãe</label>
                            <input
                                type="text"
                                value={data.mother}
                                onChange={e => setData('mother', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            />
                            {errors.mother && <div className="text-red-500 text-sm mt-1">{errors.mother}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Prole</label>
                            <textarea
                                value={data.progeny}
                                onChange={e => setData('progeny', e.target.value)}
                                className="mt-1 block w-full border rounded p-2 focus:ring focus:ring-indigo-300"
                            ></textarea>
                            {errors.progeny && <div className="text-red-500 text-sm mt-1">{errors.progeny}</div>}
                        </div>

                        {/* Botão customizado para upload */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Fotos</label>
                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <SecondaryButton type="button" onClick={openFileDialog} className="mt-1 block">
                                Selecionar Fotos
                            </SecondaryButton>
                            {errors.photos && <div className="text-red-500 text-sm mt-1">{errors.photos}</div>}
                        </div>
                        <hr className="my-6" />

                        <div className="flex justify-center">
                            <PrimaryButton type="submit" className="w-full" disabled={processing}>
                                Cadastrar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}