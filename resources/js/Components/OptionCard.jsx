import React from 'react';
import { Link } from '@inertiajs/react';

export default function OptionCard({ href, icon: Icon, children }) {
    return (
        <Link href={href} className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4 hover:bg-brand-50" >
            <Icon className="h-8 w-8 text-brand-600" />
            <span className="mt-2 text-sm font-semibold text-gray-700 text-center">{children}</span>
        </Link>
    );
}
