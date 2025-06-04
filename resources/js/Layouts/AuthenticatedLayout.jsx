export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}
