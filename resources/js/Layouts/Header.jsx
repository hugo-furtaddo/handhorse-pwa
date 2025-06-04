import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import DesktopMenu from '@/Components/Navigation/DesktopMenu';
import MobileMenu from '@/Components/Navigation/MobileMenu';

export default function Header() {
    const user = usePage().props.auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const toggleMenu = () => setShowingNavigationDropdown(prev => !prev);

    return (
        <header className="bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-sm fixed top-0 inset-x-0 z-50">
            <nav className="border-b border-brand-400/40" aria-label="Navegação Principal">
                <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-8 w-auto" />
                            </Link>
                            <div className="hidden ml-4 space-x-4 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} variant="dark">
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <DesktopMenu user={user} />
                            <div className="ml-2 -mr-2 flex sm:hidden">
                                <button
                                    onClick={toggleMenu}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-brand-600 focus:outline-none focus:ring"
                                    aria-label="Abrir menu"
                                    aria-expanded={showingNavigationDropdown}
                                    aria-controls="mobile-menu"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={showingNavigationDropdown ? 'hidden' : 'inline-flex'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {showingNavigationDropdown && (
                <MobileMenu user={user} closeMenu={toggleMenu} />
            )}
        </header>
    );
}
