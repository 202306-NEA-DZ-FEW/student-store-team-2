"use client";
import { useTranslations } from "next-intl";
function FeatureBanner() {
    const t = useTranslations("Index");
    return (
        <div className='flex flex-wrap md:flex-no-wrap  justify-center  md:space-x-6 mt-20 pt-14'>
            <div
                className='flex flex-row space-x-2  '
                style={{ width: "283px" }}
            >
                <svg
                    width='25'
                    height='27'
                    viewBox='0 0 25 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M3.83501 25.9993C5.40075 25.9993 6.67003 24.7557 6.67003 23.2216C6.67003 21.6875 5.40075 20.4438 3.83501 20.4438C2.26928 20.4438 1 21.6875 1 23.2216C1 24.7557 2.26928 25.9993 3.83501 25.9993Z'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M19.4275 25.9993C20.9933 25.9993 22.2626 24.7557 22.2626 23.2216C22.2626 21.6875 20.9933 20.4438 19.4275 20.4438C17.8618 20.4438 16.5925 21.6875 16.5925 23.2216C16.5925 24.7557 17.8618 25.9993 19.4275 25.9993Z'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M19.4276 20.4441H3.83501V1H1'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M3.83496 3.77734L23.6801 5.16621L22.2625 14.8883H3.83496'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
                <div className=' '>
                    <p className='uppercase text-12 md:text-25 '>
                        {t("Free delivery")}{" "}
                    </p>
                    <p className='text-12 md:text-16 text-content '>
                        {" "}
                        {t("feature descriprion 1")}
                    </p>
                </div>
            </div>
            <div
                className='flex flex-row space-x-2  '
                style={{ width: "283px" }}
            >
                <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M14.3645 18.2502C19.2262 18.2502 23.1675 14.3886 23.1675 9.6251C23.1675 4.86159 19.2262 1 14.3645 1C9.50274 1 5.56152 4.86159 5.56152 9.6251C5.56152 14.3886 9.50274 18.2502 14.3645 18.2502Z'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M14.3677 18.2544L19.356 26.7214L21.7005 22.0739L26.9794 22.4074L21.991 13.9419'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M6.73835 13.9419L1.75 22.4089L7.02884 22.0739L9.37337 26.72L14.3617 18.2544'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
                <div className=' '>
                    <p className='uppercase text-12 md:text-25 '>
                        {t("qualite guarantee")}
                    </p>
                    <p className='text-12 md:text-16 text-content '>
                        {" "}
                        {t("feature descriprion 2")}
                    </p>
                </div>
            </div>
            <div
                className='flex flex-row space-x-2  '
                style={{ width: "283px" }}
            >
                <svg
                    width='29'
                    height='27'
                    viewBox='0 0 29 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M13.4708 1L26.6567 13.9195C27.0171 14.3143 27.2163 14.8253 27.2163 15.355C27.2163 15.8846 27.0171 16.3957 26.6567 16.7905L17.8661 25.4035C17.4632 25.7566 16.9416 25.9518 16.401 25.9518C15.8604 25.9518 15.3388 25.7566 14.9359 25.4035L1.75 12.484V6.742C1.75 5.21913 2.36743 3.75863 3.46647 2.68179C4.56551 1.60496 6.05613 1 7.61041 1H13.4708Z'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M10.5406 12.4842C12.1589 12.4842 13.4708 11.1988 13.4708 9.61319C13.4708 8.02758 12.1589 6.74219 10.5406 6.74219C8.92225 6.74219 7.61035 8.02758 7.61035 9.61319C7.61035 11.1988 8.92225 12.4842 10.5406 12.4842Z'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
                <div className=' '>
                    <p className='uppercase text-12 md:text-25 '>
                        {t("daily offers")}{" "}
                    </p>
                    <p className='text-12 md:text-16 text-content '>
                        {" "}
                        {t("feature descriprion 3")}
                    </p>
                </div>
            </div>
            <div
                className='flex flex-row space-x-2  '
                style={{ width: "283px" }}
            >
                <svg
                    width='28'
                    height='27'
                    viewBox='0 0 28 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M9.98706 13.4999L12.8221 16.2777L18.4922 10.7222'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                    <path
                        d='M14.2395 1C17.5506 3.87024 21.8722 5.36468 26.2885 5.16667C26.9315 7.30974 27.1283 9.55759 26.8671 11.7766C26.6059 13.9957 25.8921 16.1407 24.7681 18.0841C23.6441 20.0275 22.1329 21.7297 20.3242 23.0896C18.5155 24.4494 16.4463 25.4392 14.2395 26C12.0327 25.4392 9.96353 24.4494 8.15485 23.0896C6.34618 21.7297 4.83495 20.0275 3.71097 18.0841C2.58699 16.1407 1.8732 13.9957 1.61201 11.7766C1.35081 9.55759 1.54755 7.30974 2.19053 5.16667C6.60689 5.36468 10.9284 3.87024 14.2395 1'
                        stroke='#72AEC8'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
                <div className=' '>
                    <p className='uppercase text-12 md:text-25 '>
                        {t("100% secure payement")}{" "}
                    </p>
                    <p className='text-12 md:text-16 text-content '>
                        {" "}
                        {t("feature descriprion 4")}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default FeatureBanner;
