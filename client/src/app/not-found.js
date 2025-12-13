import styles from "./not-found.module.css"
import Link from "next/link";
import Image from "next/image";
import error from "../../public/Error TV.png"

export default function NotFound() {

    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <p>صفحه مورد نظر یافت نشد!</p>
                <div className={styles.linkBox}>
                    <Link className={styles.link} href="/">بازگشت به صفحه اصلی</Link>
                </div>
            </div>
            <div className={styles.image}>
                <Image src={error} alt="error-icon"/>
            </div>
        </div>
    );
}