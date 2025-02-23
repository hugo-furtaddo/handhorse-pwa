import Header from './Header';
import Footer from './Footer';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            <Header />
            <main className="flex-1 pt-20 pb-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
