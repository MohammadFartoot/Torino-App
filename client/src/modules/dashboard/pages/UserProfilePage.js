"use client"

import styles from "@/dashboard/pages/UserProfilePage.module.css"
import Image from "next/image";
import profile from "@/dashboard/images/blackprofile.png"
import foggySun from "@/dashboard/images/sun-fog.png"
import transaction from "@/dashboard/images/convert-card.png"
import {useDashboard} from "@/dashboard/context/DashboardProvider";
import UserAccountInfo from "@/dashboard/components/UserAccountInfo";
import MyTours from "@/dashboard/components/MyTours";
import MyTransactions from "@/dashboard/components/MyTransactions";



function UserProfilePage() {

    const {active, setActiveMenu} = useDashboard();

    return (
        <div className={styles.container}>
            <div className={styles.selectOptionContainer}>
                <div className={`${styles.box} ${active === "profile" ? styles.active : ""}`}
                     onClick={() => setActiveMenu("profile")}>
                    <Image className={styles.img} src={profile} width={20} height={20} alt="profile-icon"/>
                    <p>پروفایل</p>
                </div>
                <div className={styles.border}></div>
                <div className={`${styles.box} ${active === "myTours" ? styles.active : ""}`}
                     onClick={() => setActiveMenu("myTours")}>
                    <Image className={styles.img} src={foggySun} width={20} height={20} alt="sun-icon"/>
                    <p>تور های من</p>
                </div>
                <div className={styles.border}></div>
                <div className={`${styles.box} ${active === "transactions" ? styles.active : ""}`}
                     onClick={() => setActiveMenu("transactions")}>
                    <Image className={styles.img} src={transaction} width={20} height={20}
                           alt="transaction-icon"/>
                    <p>تراکنش ها</p>
                </div>
            </div>
            <div>
                {active === "profile" && <UserAccountInfo />}
                {active === "myTours" && <MyTours />}
                {active === "transactions" && <MyTransactions />}
            </div>
        </div>
    );
}

export default UserProfilePage;