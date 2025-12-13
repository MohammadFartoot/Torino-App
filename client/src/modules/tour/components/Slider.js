"use client"

import image1 from "@/tour/images/image1.png"
import image2 from "@/tour/images/image2.png"
import image3 from "@/tour/images/image3.png"
import image4 from "@/tour/images/image4.png"
import Image from "next/image";
import styles from "./Slider.module.css"
import {useState} from "react";


const images = [image1, image2, image3, image4]

export default function Slider() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={styles.container}>
            {images.map((img, index) => {
                const offset = activeIndex - index
                return (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === activeIndex ? styles.active : ""}`}
                        style={{
                            zIndex: index === activeIndex ? images.length : images.length - Math.abs(offset),
                            transform: `translate(${offset * 35}px, ${Math.abs(offset) * 10}px) rotate(${offset * 3}deg) scale(${index === activeIndex ? 0.9 : 0.8})`,
                        }}
                        onClick={() => setActiveIndex(index)}
                    >
                        <Image src={img} alt={`slide-${index}`} width={389} height={479}/>
                    </div>
                )
            })}
        </div>
    )
}

