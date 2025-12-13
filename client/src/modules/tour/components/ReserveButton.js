"use client"

import styles from "./ReserveButton.module.css";
import airPlane from "@/tour/images/airplane.png"
import {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useAddToBasket} from "@/tour/hooks/useAddToBasket";
import toast from "react-hot-toast";

export default function ReserveButton({id}) {

    const [animate, setAnimate] = useState(false);
    const router = useRouter();
    const {mutate, isPending} = useAddToBasket()

    const flyHandler = () => {

        const isMobileSize = window.innerWidth < 481

        if (isMobileSize) {
            router.push("/checkout/basket");
            return;
        }

        setAnimate(true);
        setTimeout(() => setAnimate(false), 4000);
    }

    const endFlyHandler = () => {
        setAnimate(false);
        router.push("/checkout/basket");
    }

    const reserveHandler = () => {
        if (isPending) return;

        mutate(id, {
            onSuccess: (data) => {
                toast.success(data?.message, {
                    duration: 5000,
                    position: "top-left",
                    style: {
                        fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                        fontSize: "17px",
                        padding: "10px",
                    },
                });
                flyHandler();
            },
            onError: (error) => {
                toast.error(error.message, {
                    duration: 5000,
                    position: "top-left",
                    fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                    fontSize: "17px",
                    padding: "10px",
                })
            }
        })
    }

    return (
        <div className={styles.ReserveBox}>
            <button onClick={() => reserveHandler()}>
                رزرو و خرید
                <Image className={`${styles.img} ${animate ? styles.fly : ""}`}
                       src={airPlane}
                       width={35}
                       height={35}
                       alt="plane-icon"
                       onAnimationEnd={() => endFlyHandler()}
                />
            </button>
        </div>
    );
}