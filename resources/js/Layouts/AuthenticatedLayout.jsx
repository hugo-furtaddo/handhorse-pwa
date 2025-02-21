import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function DesktopMenu({ user }) {
    return (
        <div className="hidden sm:flex sm:items-center">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-full">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-full border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none"
                            aria-label="Opções do usuário"
                        >
                            {user?.name}
                            <svg
                                className="ml-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                    <Dropdown.Link href={route('animals.create')}>Cadastrar Animal</Dropdown.Link>
                    <Dropdown.Link href={route('animal-health')}>Saúde Animal</Dropdown.Link>
                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

function MobileMenu({ user, closeMenu }) {
    return (
        // Renderizado como um elemento fixo abaixo do cabeçalho
        <div
            id="mobile-menu"
            className="fixed top-16 left-0 right-0 z-40 origin-top transform transition-transform duration-300 scale-y-100 opacity-100 overflow-hidden bg-white shadow-lg rounded-b-2xl"
        >
            <div className="space-y-2 pb-4 pt-3">
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('animals.create')} active={route().current('animals.create')}>
                    Cadastrar Animal
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('animal-health')} active={route().current('animal-health')}>
                    Saúde Animal
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('reproduction.index')} active={route().current('reproduction.index')}>
                    Reprodução
                </ResponsiveNavLink>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="px-4">
                    <div className="text-base font-semibold text-gray-800">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
                <div className="mt-3 space-y-2">
                    <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                        Sair
                    </ResponsiveNavLink>
                </div>
            </div>
            {/* Botão para fechar o menu */}
            <div className="flex justify-end px-4 pb-2">
                <button
                    onClick={closeMenu}
                    className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            {/* Cabeçalho fixo com aparência nativa */}
            <header className="bg-white shadow-sm fixed top-0 inset-x-0 z-50">
                <nav className="border-b border-gray-100" role="navigation" aria-label="Navegação Principal">
                    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="h-8 w-auto" />
                                </Link>
                                <div className="hidden ml-4 space-x-4 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <DesktopMenu user={user} />
                                <div className="ml-2 -mr-2 flex sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
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
            </header>
            {/* Renderiza o menu mobile separadamente, fora do cabeçalho */}
            {showingNavigationDropdown && (
                <MobileMenu
                    user={user}
                    closeMenu={() => setShowingNavigationDropdown(false)}
                />
            )}
            {/* Área de conteúdo principal com espaçamento para cabeçalho fixo e barra inferior */}
            <main className="flex-1 pt-20 pb-16">
                {children}
            </main>
            {/* Barra de navegação inferior para simular um app mobile nativo */}
            <footer className="bg-white shadow-inner fixed bottom-0 inset-x-0">
                <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-around py-3">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                            </svg>
                        </NavLink>
                        <NavLink href={route('animals.create')} active={route().current('animals.create')}>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </NavLink>
                        <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4 4 0 016 14a4 4 0 118 0 4 4 0 01-1.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </footer>
        </div>
    );
}