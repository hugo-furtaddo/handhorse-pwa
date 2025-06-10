import Header from './Header';
import Footer from './Footer';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col pt-16 pb-16">
            <Header />
            <main className="flex-1 flex flex-col px-2">
                {children}
            </main>
            <Footer />
        </div>
    );
}
