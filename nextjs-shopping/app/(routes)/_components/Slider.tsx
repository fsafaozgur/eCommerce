
'use server'
import getSliders from '@/actions/getSliders';
//import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image';

import Link from 'next/link';
//import SliderSkeleton from './Menu/Skeleton/SliderSkeleton';






export default async function Slider() {

  const sliders = await getSliders();

  return (

    <div>

                  <Carousel className='w-[95%] items-center justify-center m-12'
                      opts={{
                      align: "start",
                      loop: true,
                      }}
                  >
                      <CarouselContent>
                          {sliders?.map((slider) => (
                              <CarouselItem key={slider.id}>
                                <Link href={slider?.url}>
                                  <Image
                                      alt='slider'
                                      src={process.env.NEXT_PUBLIC_BACKEND_URL + slider?.media?.url}
                                      width={500}
                                      unoptimized={true}
                                      height={300}
                                      className='w-full h-[200px] md:h-[450px] object-cover'
                                    />
                                </Link>
                              </CarouselItem>

                            ))}

                  </CarouselContent>
                  <CarouselPrevious className='left-0' />
                  <CarouselNext className='right-0'/>
                </Carousel>

    </div>

  )
}

