import NavLink from '@/Components/NavLink';

export default function Footer() {
    return (
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
    );
}
