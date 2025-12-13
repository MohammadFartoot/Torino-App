import Image from "next/image";
import styles from "@/shared/components/Header.module.css"
import Torino from "@/shared/images/Torino.png"
import LoginButton from "@/auth/components/LoginButton";
import MainPageButton from "@/shared/components/MainPageButton";
import HamburgerMenuButton from "@/shared/components/HamburgerMenuButton";


function Header() {
    return (
        <nav className={styles.navbar}>
            <HamburgerMenuButton/>
            <ul className={styles.links}>
                <li><Image className={styles.torino} src={Torino} width={146} height={44} alt="torino-icon"/></li>
                <li><MainPageButton/></li>
                <li>خدمات گردشگری</li>
                <li>درباره ما</li>
                <li>تماس با ما</li>
                <li><LoginButton/></li>
            </ul>
        </nav>
    );
}

export default Header;