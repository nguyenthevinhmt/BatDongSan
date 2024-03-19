import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';

interface ICarousel {
    src: string,
    alt: string
}

export const CarouselAds = ({ data, width, height }: { data?: any, width: number, height: number }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };


    return (
        <div style={{
            width: `100%`,
            height: `auto`,
            transition: 'transform 0.5s ease'
        }} className="carousel">
            <IoIosArrowBack onClick={prevSlide} className="arrow arrow-left" />
            {data.map((item: ICarousel, idx: any) => {
                return (
                    <Image
                        width={width}
                        height={height}
                        src={item.src}
                        alt={item.alt}
                        key={idx}
                        className={slide === idx ? "slide_ads" : "slide_ads slide-hidden"}
                        priority
                    />
                );
            })}
            <IoIosArrowForward
                onClick={nextSlide}
                className="arrow arrow-right"
            />
            <span className="indicators">
                {data?.map((_: any, idx: any) => {
                    return (
                        <button
                            key={idx}
                            className={
                                slide === idx ? "indicator" : "indicator indicator-inactive"
                            }
                            onClick={() => setSlide(idx)}
                        ></button>
                    );
                })}
            </span>
        </div>
    );
};