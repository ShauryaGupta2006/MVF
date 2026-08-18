import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-surface text-white font-sans antialiased selection:bg-primary selection:text-white">
            <Header />
            <main className="grow">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
