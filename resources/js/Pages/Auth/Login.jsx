import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    {/* Centralizando a logo */}
                    <div className="flex justify-center mb-6">
                        <img src="/handhorse.png" alt="Handhorse Logo" className="h-20" />
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
