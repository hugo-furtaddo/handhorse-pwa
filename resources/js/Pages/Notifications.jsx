import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Notifications({ notifications }) {
    const unread = notifications.filter(n => !n.read_at).length;

    const markAllRead = () => {
        router.post(route('notifications.read'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Notificações</h2>}
        >
            <Head title="Notificações" />
            <div className="px-4 py-5 space-y-4">
                {unread > 0 && (
                    <button onClick={markAllRead} className="text-sm text-indigo-600">
                        Marcar todas como lidas
                    </button>
                )}
                {notifications.length > 0 ? (
                    <ul className="space-y-4">
                        {notifications.map(n => (
                            <li
                                key={n.id}
                                className="bg-white p-4 rounded shadow flex justify-between"
                            >
                                <div>
                                    <p>{n.data.message}</p>
                                    {n.data.rule && (
                                        <p className="text-xs text-gray-500">{n.data.rule}</p>
                                    )}
                                </div>
                                {!n.read_at && (
                                    <span className="self-center text-xs text-red-500">Nova</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma notificação.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
