import styles from "@/shared/components/Footer.module.css"
import Image from "next/image";
import Torino from "@/shared/images/Torino.png"
import airline from "@/shared/images/state-airline-f45c55b2 1.png"
import passenger from "@/shared/images/passenger-rights-48368f81 1.png"
import ecunion from "@/shared/images/ecunion-35c3c933.png"
import samandehi from "@/shared/images/samandehi-6e2b448a.png"
import aira from "@/shared/images/aira-682b7c43.png"
import TopBorder from "@/shared/components/TopBorder";

function Footer() {

    return (
        <>
            <TopBorder/>
            <div className={styles.container}>
                <div className={styles.torinoBox}>
                    <h3>تورینو</h3>
                    <ul>
                        <li>درباره ما</li>
                        <li>تماس با ما</li>
                        <li>چرا تورینو</li>
                        <li>بیمه مسافرتی</li>
                    </ul>
                </div>
                <div className={styles.customerBox}>
                    <h3>خدمات مشتریان</h3>
                    <ul>
                        <li>پشتیبانی آنلاین</li>
                        <li>راهنمای خرید</li>
                        <li>راهنمای استرداد</li>
                        <li>پرسش و پاسخ</li>
                    </ul>
                </div>
                <div className={styles.informationBox}>
                    <Image className={styles.torinoLogo} src={Torino} width={146} height={44} alt="torino-icon"/>
                    <div className={styles.supportBox}>
                        <p>تلفن پشتیبانی: </p>
                        <p>۰۲۱-۸۵۷۴</p>
                    </div>
                    <div className={styles.logoBox}>
                        <Image className={styles.image} src={airline} width={78} height={74} alt="airline-logo"/>
                        <Image className={styles.image} src={passenger} width={71} height={74}
                               alt="passenger-logo"/>
                        <Image className={styles.image} src={ecunion} width={68} height={74} alt="ecunion-logo"/>
                        <Image className={styles.image} src={samandehi} width={67} height={74}
                               alt="samandehi-logo"/>
                        <Image className={styles.image} src={aira} width={68} height={74} alt="aira-logo"/>
                    </div>
                </div>
            </div>
            <div className={styles.mobileContainer}>
                <div className={styles.linksWrapper}>
                    <div className={styles.torinoBox}>
                        <h3>تورینو</h3>
                        <ul>
                            <li>درباره ما</li>
                            <li>تماس با ما</li>
                            <li>چرا تورینو</li>
                            <li>بیمه مسافرتی</li>
                        </ul>
                    </div>
                    <div className={styles.customerBox}>
                        <h3>خدمات مشتریان</h3>
                        <ul>
                            <li>پشتیبانی آنلاین</li>
                            <li>راهنمای خرید</li>
                            <li>راهنمای استرداد</li>
                            <li>پرسش و پاسخ</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.logoBox}>
                    <div className={styles.firstRow}>
                        <Image className={styles.image} src={ecunion} width={68} height={74} alt="ecunion-logo"/>
                        <Image className={styles.image} src={samandehi} width={67} height={74}
                               alt="samandehi-logo"/>
                        <Image className={styles.image} src={aira} width={68} height={74} alt="aira-logo"/>
                    </div>
                    <div className={styles.secondRow}>
                        <Image className={styles.image} src={airline} width={78} height={74} alt="airline-logo"/>
                        <Image className={styles.image} src={passenger} width={71} height={74}
                               alt="passenger-logo"/>
                    </div>
                </div>
                <div className={styles.phoneBox}>
                    <Image className={styles.torinoLogo} src={Torino} width={146} height={44} alt="torino-icon"/>
                    <div className={styles.supportBox}>
                        <p>تلفن پشتیبانی: </p>
                        <p>۰۲۱-۸۵۷۴</p>
                    </div>
                </div>
            </div>
            <div className={styles.belowBorder}></div>
            <p className={styles.copyRight}>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
        </>
    );
}

export default Footer;