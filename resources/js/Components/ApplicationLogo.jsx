import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/handhorse.png"
            alt="Handhorse Logo"
            className="h-16 w-auto" // Ajuste o tamanho conforme necessário
        />
    );
}
