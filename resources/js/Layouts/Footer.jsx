import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';

export default function Footer() {
    const unread = usePage().props.unreadNotificationsCount || 0;

    return (
        <footer className="bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-inner fixed bottom-0 inset-x-0">
            <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
                <div className="flex justify-around py-3">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} variant="dark">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                        </svg>
                    </NavLink>
                    <NavLink href={route('animals.create')} active={route().current('animals.create')} variant="dark">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </NavLink>
                    <NavLink href={route('notifications.index')} active={route().current('notifications.index')} variant="dark">
                        <div className="relative">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {unread > 0 && (
                                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                            )}
                        </div>
                    </NavLink>
                    <NavLink href={route('profile.edit')} active={route().current('profile.edit')} variant="dark">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4 4 0 016 14a4 4 0 118 0 4 4 0 01-1.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </footer>
    );
}
