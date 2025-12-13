"use client"

import styles from "./MainPageButton.module.css"
import {useRouter} from "next/navigation";
import {useSearch} from "@/tour/context/TourProvider";


export default function MainPageButton() {

    const {resetSearch} = useSearch();

    const router = useRouter();

    const resetHandler = () => {
        resetSearch();
        router.push("/");
    }

    return (
        <button onClick={() => resetHandler()} className={styles.mainLink}>
            صفحه اصلی
        </button>
    );
}