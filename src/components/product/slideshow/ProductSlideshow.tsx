'use client'
import { useState } from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react"
import {Swiper as SwiperObject} from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { ProductImage } from '@/components';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';


interface Props {
    images       : string[];
    title        : string;
    className   ?: string;
}

export const ProductSlideshow = ({ images, title, className }:Props) => {
    
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (

    <div className={`${className} contenedor`}>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
        }
        
        spaceBetween={10}
        navigation={true}
        autoplay={{
            delay:2500
        }}
        thumbs={{
             swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
            }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
        images.length ? images.map(image => (
                <SwiperSlide key={image}>
                  <ProductImage
                  src={ image }
                  alt={`${title}`}
                  
                  width={1024}
                  height={800}
                  className="rounded-lg object-cover"
                  />
                </SwiperSlide>
            )) 
          :
          (
                <SwiperSlide >
                  <ProductImage
                  src={ images[0] }
                  alt={`${title}`}
                  
                  width={1024}
                  height={800}
                  className="rounded-lg object-cover"
                  />
                </SwiperSlide>
          )
         }
    
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {
          images.length ? images.map(image => (
                <SwiperSlide key={image}>
                  <ProductImage 
                  src={ image }
                  alt={`title`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                  />
                </SwiperSlide>
            ))
            :
            (
              <SwiperSlide >
                  <ProductImage 
                  src={ images[0] }
                  alt={`title`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                  />
                </SwiperSlide>
            )
        }
      </Swiper>
    </div>
    
  )
}
