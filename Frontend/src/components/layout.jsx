import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-white font-sans antialiased selection:bg-red-600 selection:text-white">
            {/* Header stays at the top */}
            <Header />

            {/* Main content takes up remaining vertical space */}
            <main className="grow">
                {children}
            </main>

            {/* Footer stays at the bottom */}
            <Footer />
        </div>
    );
}

export default Layout;
