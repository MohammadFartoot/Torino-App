import "@/core/styles/globals.css";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import Provider from "@/core/providers/Provider";
import {Toaster} from "react-hot-toast";
import AuthModalContainer from "@/auth/components/AuthModalContainer";
import ClientMain from "./ClientMain";


export const metadata = {
    title: "تور های مسافرتی داخلی و خارجی | آژانس تورینو", description: "تورینو", icons: {
        icon: "/favicon.ico",
    }
};

export default function RootLayout({children}) {

    return (<html lang="fa" dir="rtl">
    <body cz-shortcut-listen="true">
    <div className="layout">
        <Provider>
            <AuthModalContainer/>
            <Header/>
            <ClientMain>
                {children}
            </ClientMain>
            <Footer/>
        </Provider>
        <Toaster/>
    </div>
    </body>
    </html>);
}

