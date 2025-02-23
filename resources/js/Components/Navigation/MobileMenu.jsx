import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function MobileMenu({ user, closeMenu }) {
    return (
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
