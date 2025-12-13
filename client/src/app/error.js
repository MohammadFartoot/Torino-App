"use client"

import styles from "./error.module.css"
import Image from "next/image";
import error from "../../public/ErrorLamp.png"

export default function Error() {
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <p>اتصال با سرور برقرار نیست!</p>
                <p>لطفا بعدا دوباره امتحان کنید.</p>
            </div>
            <div className={styles.imageBox}>
                <Image src={error} width={555} height={555} alt="error-icon"/>
            </div>
        </div>
    );
}