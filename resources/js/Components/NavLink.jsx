import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    variant = 'light',
    className = '',
    children,
    ...props
}) {
    const base =
        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ';
    const colorClasses =
        variant === 'dark'
            ? active
                ? 'border-white text-white focus:border-white '
                : 'border-transparent text-white/80 hover:text-white focus:text-white '
            : active
            ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 '
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 ';

    return (
        <Link {...props} className={base + colorClasses + className}>
            {children}
        </Link>
    );
}
