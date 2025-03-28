
import { Product } from '@/constants/type'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image';

interface ProductProps {
    images:Product['images'];
}


//const ProductImages = ({images}) => {
const ProductImages = ({images}:ProductProps) => {

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }


  const hasMultipleImages = images?.length > 1;

  return (
    <div>
      <Carousel
      
      opts={{
        align: "start",
        loop: true,
      }}
      
      >
  <CarouselContent>
      {images?.map( (image) => (
        <CarouselItem key={image.id}>
            <Image 
                width={500}
                alt='alt'
                unoptimized={true}
                height={200}
                src={process.env.NEXT_PUBLIC_BACKEND_URL + image?.formats?.thumbnail?.url} 
            className='rounded-3xl scale-95  group-hover:scale-100 transition-all duration-700'
            />
        
        </CarouselItem>



      ))}
  </CarouselContent>
  {hasMultipleImages && <CarouselPrevious className='left-0'/>}
  {hasMultipleImages && <CarouselNext className='right-0'/>}
</Carousel>
    </div>
  )
}

export default ProductImages
