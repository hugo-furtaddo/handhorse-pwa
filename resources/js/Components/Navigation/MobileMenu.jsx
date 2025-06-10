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
                <ResponsiveNavLink href={route('finance.index')} active={route().current('finance.index')}>
                    Financeiro
                </ResponsiveNavLink>
            </div>
            <div className="p-2 text-right border-t">
                <button onClick={closeMenu} className="text-sm text-brand-600">
                    Fechar
                </button>
            </div>
        </div>
    );
}
