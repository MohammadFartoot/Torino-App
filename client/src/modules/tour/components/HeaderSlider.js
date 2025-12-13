"use client";


import {useEffect, useState} from "react";
import styles from "./HeaderSlider.module.css"
import header1 from "@/tour/images/Untitled_design__1_.webp";
import header2 from "@/tour/images/Torinooo-2-2.webp";
import header3 from "@/tour/images/Tor-2.webp";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const images = [header1, header2, header3];


function Carousel() {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null;

    useEffect(() => {
        timeOut =
            autoPlay &&
            setTimeout(() => {
                slideRight();
            }, 4500);
    });

    const slideRight = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const slideLeft = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };
    return (
        <div
            className={styles.carousel}
            onMouseEnter={() => {
                setAutoPlay(false);
                clearTimeout(timeOut);
            }}
            onMouseLeave={() => {
                setAutoPlay(true);
            }}
        >
            <div className={styles.carousel_wrapper}>
                {images.map((image, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                index == current
                                    ? `${styles.carousel_card} ${styles.carousel_card_active}`
                                    : styles.carousel_card
                            }
                        >
                            <img className={styles.card_image} src={image.src} alt="banner-image"/>
                        </div>
                    );
                })}
                <div className={styles.carousel_arrow_left} onClick={slideLeft}>
                    <ChevronLeft size={44} className={styles.chevronLeft}/>
                </div>
                <div className={styles.carousel_arrow_right} onClick={slideRight}>
                    <ChevronRight size={44} className={styles.chevronRight}/>
                </div>
                <div className={styles.carousel_pagination}>
                    {images.map((_, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    index == current
                                        ? `${styles.pagination_dot} ${styles.pagination_dot_active}`
                                        : styles.pagination_dot
                                }
                                onClick={() => setCurrent(index)}
                            ></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Carousel;


