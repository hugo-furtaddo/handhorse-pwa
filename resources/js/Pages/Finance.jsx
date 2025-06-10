import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FinanceChart from '@/Components/FinanceChart';

export default function Finance({ entries, chart }) {
    const { flash = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'custo',
        descricao: '',
        valor: '',
        data: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('finance.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Financeiro" />
            <main className="p-4 space-y-4">
                {flash.success && (
                    <div className="p-2 bg-green-100 text-green-800 rounded">
                        {flash.success}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
                    <div>
                        <label className="block">Tipo</label>
                        <select value={data.type} onChange={e => setData('type', e.target.value)} className="mt-1 w-full border rounded p-2 focus:ring-brand-500">
                            <option value="custo">Custo</option>
                            <option value="receita">Receita</option>
                        </select>
                        {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
                    </div>
                    <div>
                        <label className="block">Descrição</label>
                        <input type="text" value={data.descricao} onChange={e => setData('descricao', e.target.value)} className="mt-1 w-full border rounded p-2 focus:ring-brand-500" />
                        {errors.descricao && <div className="text-red-500 text-sm">{errors.descricao}</div>}
                    </div>
                    <div>
                        <label className="block">Valor</label>
                        <input type="number" step="0.01" value={data.valor} onChange={e => setData('valor', e.target.value)} className="mt-1 w-full border rounded p-2 focus:ring-brand-500" />
                        {errors.valor && <div className="text-red-500 text-sm">{errors.valor}</div>}
                    </div>
                    <div>
                        <label className="block">Data</label>
                        <input type="date" value={data.data} onChange={e => setData('data', e.target.value)} className="mt-1 w-full border rounded p-2 focus:ring-brand-500" />
                        {errors.data && <div className="text-red-500 text-sm">{errors.data}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="bg-brand-600 text-white px-4 py-2 rounded">Salvar</button>
                </form>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Registros</h3>
                    {entries.length ? (
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="p-2 text-left">Data</th>
                                    <th className="p-2 text-left">Tipo</th>
                                    <th className="p-2 text-left">Descrição</th>
                                    <th className="p-2 text-right">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map(entry => (
                                    <tr key={entry.id} className="border-t">
                                        <td className="p-2">{new Date(entry.data).toLocaleDateString()}</td>
                                        <td className="p-2 capitalize">{entry.type}</td>
                                        <td className="p-2">{entry.descricao}</td>
                                        <td className="p-2 text-right">{Number(entry.valor).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhum registro cadastrado.</p>
                    )}
                </div>
                <FinanceChart data={chart} />
            </main>
        </AuthenticatedLayout>
    );
}
