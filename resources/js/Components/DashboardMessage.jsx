import React from 'react';

export default function DashboardMessage() {
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Bem-vindo(a) ao Dashboard!</h3>
            <p className="text-gray-700">
                Você está logado e pode acessar todas as funcionalidades da aplicação.
            </p>
        </div>
    );
}
