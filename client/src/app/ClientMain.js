"use client";

import { usePathname } from "next/navigation";

export default function ClientMain({ children }) {
    const pathname = usePathname() || "/";

    const grayRoutes = ["/tour", "/checkout"];
    const isGrayPage = grayRoutes.some((path) => pathname.startsWith(path));

    const mainClass = isGrayPage ? "main-gray" : "main-white";

    return <main className={mainClass}>{children}</main>;
}
