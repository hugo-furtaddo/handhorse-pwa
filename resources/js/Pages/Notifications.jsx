import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Notifications({ notifications }) {
    const unread = notifications.filter(n => !n.read_at).length;
    const [showInfo, setShowInfo] = useState(false);

    const markAllRead = () => {
        router.post(route('notifications.read'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Notificações" />
            <div className="px-4 py-5 space-y-4">
                <section className="bg-white rounded shadow">
                    <button
                        onClick={() => setShowInfo(prev => !prev)}
                        className="flex items-center justify-between w-full p-4"
                    >
                        <span className="text-lg font-semibold">Informações sobre Lembretes e Multas</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${showInfo ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    {showInfo && (
                        <div className="px-4 pb-4 space-y-2 text-sm">
                            <p>
                                Para manter o registro dos animais em dia, é importante respeitar os prazos de comunicação para cada tipo de notificação. O descumprimento desses prazos pode gerar multas conforme as regras de cada associação.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Comunicação de cobrição</li>
                                <li>Comunicação de nascimento</li>
                                <li>Resenha do potro</li>
                                <li>Comunicação de TE (transferência de embrião)</li>
                            </ul>
                            <div className="space-y-1">
                                <p className="font-semibold mt-4">Mangalarga Marchador (ABCCMM)</p>
                                <p>Prazo de 120 dias para comunicar cobrição e nascimento sem multa. Após esse período, a multa é de R$ 300,00 por animal.</p>

                                <p className="font-semibold mt-4">Mangalarga Paulista (ABCCRM)</p>
                                <p>Comunicações devem ser enviadas semestralmente: eventos de janeiro a junho até 31/08 e de julho a dezembro até 28/02. A cada seis meses de atraso há multa de R$ 233,00.</p>

                                <p className="font-semibold mt-4">Pônei (ABCC)</p>
                                <p>Envio de cobrição até 30/04 ou em até 120 dias se controlada. Multa de R$ 50,00 por animal para notificações fora do prazo.</p>

                                <p className="font-semibold mt-4">Pampa (ABCPAMPA)</p>
                                <p>Comunicações do primeiro semestre até 31/07 e do segundo semestre até 31/01. Atrasos de até 30 dias geram multa de R$ 50,00; após esse período é exigido exame de DNA com verificação de parentesco (+R$ 250,00).</p>

                                <p className="font-semibold mt-4">Pega (ABCJPEGA)</p>
                                <p>Prazo de 120 dias sem multa. Acima desse período a multa é de R$ 40,00 por animal.</p>

                                <p className="font-semibold mt-4">Crioulo (ABCCC)</p>
                                <p>Comunicação de cobrição deve ocorrer até 30/06 da temporada. Multas variam a partir de R$ 227,00 para sócios e R$ 454,00 para não sócios. Para resenhas após nove meses do nascimento, a multa inicial é de R$ 304,00 e aumenta conforme a idade do animal.</p>
                            </div>
                        </div>
                    )}
                </section>
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
                <div className="flex items-center">
                    {unread > 0 && (
                        <button onClick={markAllRead} className="text-sm text-indigo-600">
                            Marcar todas como lidas
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
