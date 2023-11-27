import {
    Jost,
    Jua,
    Lato,
    Noto_Kufi_Arabic,
    Poppins,
    Roboto,
} from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

import { getCurrentUser } from "@/lib/_supabaseAuth";

export function generateStaticParams() {
    return [{ locale: "en" }, { locale: "ar" }];
}

import { ToastContainer } from "react-toastify";

import "./globals.css";
import "./carousel.css";
import "./loader.css";
import "react-toastify/dist/ReactToastify.css";

import Footer from "@/components/footer/Footer";
import MobileNavigation from "@/components/mobileNavigation/MobileNavigation";
import { UserProvider } from "@/components/userProvider/UserProvider";

import Navbar from "../../components/navbar/Navbar";

const jua = Jua({ weight: "400", subsets: ["latin"], variable: "--font-jua" });

const lato = Lato({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    variable: "--font-lato",
});

const jost = Jost({ subsets: ["cyrillic"], variable: "--font-jost" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    variable: "--font-poppins",
});

const roboto = Roboto({
    weight: "700",
    subsets: ["cyrillic"],
    variable: "--font-roboto",
});

const notoKufi = Noto_Kufi_Arabic({
    subsets: ["arabic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-notoKufi",
});

export const metadata = {
    title: "LaCité",
    description:
        "Your one-stop destination for all your academic needs! Explore, buy, sell, or borrow items for your academic journey",
    icons: {
        icon: ["/favicon.ico?v=4"],
        apple: ["/apple-touch-icon.png?v=4"],
        shortcut: ["/apple-touch-icon.png"],
        android: ["/android-chrome-192x192.png?v=4"],
    },
    manifest: "/manifest.webmanifest",
};

export default async function RootLayout({ children, params: { locale } }) {
    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html
            lang={locale}
            className='scroll-smooth'
            dir={locale === "ar" ? "rtl" : "ltr"}
        >
            <body
                className={`"relative ${
                    locale === "ar" ? notoKufi.variable : ""
                } font-notoKufi  ${
                    locale === "en" ? jua.variable : ""
                } font-jua ${locale === "en" ? lato.variable : ""} font-lato ${
                    locale === "en" ? jost.variable : ""
                } font-jost ${
                    locale === "en" ? poppins.variable : ""
                } font-poppins ${
                    locale === "en" ? roboto.variable : ""
                } font-roboto`}
            >
                <UserProvider getCurrentUser={getCurrentUser}>
                    <NextIntlClientProvider
                        locale={locale}
                        messages={messages}
                        className='relative w-screen h-screen'
                    >
                        <Navbar />
                        {children}
                        {/* <Footer /> */}
                        <ToastContainer />
                        <Footer />
                        <MobileNavigation />
                    </NextIntlClientProvider>
                </UserProvider>
            </body>
        </html>
    );
}
