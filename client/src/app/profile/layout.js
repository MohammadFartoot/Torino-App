import AuthProvider from "@/auth/AuthProvider";

export const metadata = {
    title: "تورینو | حساب کاربری",
    description: "تورینو"
}

function ProfileLayout({children}) {

    return <AuthProvider>{children}</AuthProvider>;
}

export default ProfileLayout;
