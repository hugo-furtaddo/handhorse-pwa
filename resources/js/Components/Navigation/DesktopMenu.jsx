import Dropdown from '@/Components/Dropdown';

export default function DesktopMenu({ user }) {
    return (
        <div className="hidden sm:flex sm:items-center">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-full">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-full border border-transparent bg-brand-600 px-3 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-brand-700 focus:outline-none"
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
                    <Dropdown.Link href={route('animals.index')}>Meus Animais</Dropdown.Link>
                    <Dropdown.Link href={route('animals.create')}>Cadastrar Animal</Dropdown.Link>
                    <Dropdown.Link href={route('animal-health')}>Saúde Animal</Dropdown.Link>
                    <Dropdown.Link href={route('finance.index')}>Financeiro</Dropdown.Link>
                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}
