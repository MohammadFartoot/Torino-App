"use client"

import styles from "@/shared/components/Footer.module.css";
import {usePathname} from "next/navigation";

export default function TopBorder() {

    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <div className={`${styles.topBorder} ${isHomePage && styles.dashTopBorder}`}></div>
    );
}
