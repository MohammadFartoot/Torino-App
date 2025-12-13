"use client"

import styles from "./MyTransactions.module.css"
import {useGetUserTransactions} from "@/dashboard/hooks/useGetUserTransactions";
import {fullJalaliDate} from "@/dashboard/utils/helper"

export default function MyTransactions() {

    const {data} = useGetUserTransactions();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <p>تاریخ و ساعت</p>
                    <p>مبلغ(تومان)</p>
                    <p>نوع تراکنش</p>
                    <p>شماره سفارش</p>
                </div>
            </div>
            {data?.map((transaction) => (
                <div key={transaction.id} className={styles.dataWrapper}>
                    <div className={styles.data}>
                        <p>{fullJalaliDate(transaction.createdAt)}</p>
                        <p>{transaction.amount.toLocaleString("fa-IR")}</p>
                        <p>ثبت نام در تور گردشگری</p>
                        <p>
                            <span>سفارش</span>
                            {transaction.id.slice(0, 8)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}