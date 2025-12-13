"use client"

import home from "@/shared/images/home-2.png"
import tourServices from "@/shared/images/airplane-square.png"
import aboutUs from "@/shared/images/volume-low.png"
import callWithUs from "@/shared/images/call with us.png"
import hamburgerMenu from "@/shared/images/Group 46.png"
import styles from "./HamburgerMenuButton.module.css"
import Image from "next/image";
import {useState} from 'react';
import useClickOutside from "@/shared/hooks/useClickOutside";
import Link from "next/link";

export default function HamburgerMenuButton() {

    const [openMenu, setOpenMenu] = useState(false);

    const openMenuHandler = () => {
        setOpenMenu(true);
    }

    const menuRef = useClickOutside(() => {
        setOpenMenu(false);
    })

    return (
        <>
            <div className={`${styles.hamburgerMenuIcon} ${openMenu ? styles.hamburgerMenu : ""}`}
                 onClick={() => openMenuHandler()}>
                <Image src={hamburgerMenu} width={20} height={16} alt="menu-icon"/>
            </div>
            {openMenu && (
                <>
                    <div className={styles.backDrop}></div>
                    <div className={styles.menuContainer} ref={menuRef}>
                        <div>
                            <Link href="/" className={styles.mainPageBtn} onClick={() => setOpenMenu(false)}>
                                <Image src={home} width={16} height={16} alt="icon"/>
                                <p>صفحه اصلی</p>
                            </Link>
                        </div>
                        <div className={styles.tourServices}>
                            <Image src={tourServices} width={16} height={16} alt="icon"/>
                            <p>خدمات گردشگری</p>
                        </div>
                        <div className={styles.aboutUs}>
                            <Image src={aboutUs} width={16} height={16} alt="icon"/>
                            <p>درباره ما</p>
                        </div>
                        <div className={styles.callWithUs}>
                            <Image src={callWithUs} width={16} height={16} alt="icon"/>
                            <p>تماس با ما</p>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
        ;
}