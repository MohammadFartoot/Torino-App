import Image from "next/image";
import Link from "next/link";
import styles from "@/tour/pages/HomePage.module.css";
import cartoon from "@/tour/images/professional-cartoon.png"
import call from "@/tour/images/call.png"
import glassyDivide from "@/tour/images/Group 16.png"
import glassySupport from "@/tour/images/Group 17.png"
import glassyHeart from "@/tour/images/Group 18.png"
import polygon from "@/tour/images/Polygon 12.png"
import TourSearchClient from "@/tour/components/TourSearchWrapper";
import Slider from "@/tour/components/Slider"
import HeaderSlider from "@/tour/components/HeaderSlider";


export default async function HomePage({data}) {

    return (
        <>
            <HeaderSlider/>
            <div className={styles.container}>
                <div className={styles.intro}>
                    <p><span>تورینو</span>برگزار کننده بهترین تور های داخلی و خارجی</p>
                </div>
                <TourSearchClient initialData={data}/>
                <div className={styles.allTours}>
                    <p>همه تور ها</p>
                </div>
                {data.length === 0
                    ? (
                        <p className={styles.tourNotFound}>هیچ توری یافت نشد❗️</p>
                    ) : (
                        <div className={styles.tourContainer}>
                            {data.map((tour) => (
                                <div className={styles.tour} key={tour.id}>
                                    <Image src={tour.image} width={278} height={159} alt="images"/>
                                    <p className={styles.tourName}>{tour.title}</p>
                                    <p className={styles.tourOptions}>{tour.options}</p>
                                    <div className={styles.priceBox}>
                                        <Link className={styles.reserveBtn} href={`/tour/${tour.id}`}>
                                            رزرو
                                        </Link>
                                        <p>{tour.price.toLocaleString("fa-IR")}<span> تومان</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                <div className={styles.bannerContainer}>
                    <div className={styles.greenBox}>
                        <div className={styles.innerBox}>
                            <p>خرید تلفنی از<span>تورینو</span></p>
                            <p>به هرکجا که میخواهید!</p>
                        </div>
                        <Image className={styles.cartoon} src={cartoon} width={308} height={225} alt="cartoon-icon"/>
                    </div>
                    <div className={styles.whiteBox}>
                        <div className={styles.innerWhiteBox}>
                            <p>۰۲۱-۱۸۴۰</p>
                            <Image className={styles.call} src={call} width={24} height={24} alt="call-icon"/>
                        </div>
                        <div className={styles.moreInfo}>
                            <p>اطلاعات بیشتر</p>
                        </div>
                    </div>
                </div>
                <div className={styles.moreToursContainer}>
                    <div className={styles.moreToursBox}>
                        <div className={styles.moreToursTitle}>
                            <div className={styles.circle}></div>
                            <Image src={polygon} width={34} height={38} alt="polygon"/>
                            <span className={styles.qmark}>؟</span>
                            <div className={styles.spanBox}>
                                <span>چرا</span>
                                <span>تورینو</span>
                                <span>؟</span>
                            </div>
                        </div>
                        <div className={styles.moreToursText}>
                            <p>تور طبیعت گردی و تاریخی</p>
                            <p>
                                اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در
                                یک
                                اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید
                                از
                                جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
                                تاریخی را
                                خریداری کنید.
                            </p>
                        </div>
                    </div>
                    <div>
                        <Slider/>
                    </div>
                </div>
                <div className={styles.border}></div>
                <div className={styles.commercialBox}>
                    <div className={styles.Box}>
                        <Image src={glassyDivide} width={121} height={109} alt="glassy-icon"/>
                        <div className={styles.BoxText}>
                            <p>بصرفه ترین قیمت</p>
                            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
                        </div>
                    </div>
                    <div className={styles.Box}>
                        <Image src={glassySupport} width={109} height={99} alt="glassy-icon"/>
                        <div className={styles.BoxText}>
                            <p>پشتیبانی</p>
                            <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
                        </div>
                    </div>
                    <div className={styles.Box}>
                        <Image src={glassyHeart} width={104} height={104} alt="glassy-icon"/>
                        <div className={styles.BoxText}>
                            <p>رضایت کاربران</p>
                            <p>رضایت بیش از 10هزار کاربر از تور های ما.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}