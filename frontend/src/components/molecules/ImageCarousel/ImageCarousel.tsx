import React from "react";
import * as Styled from './ImageCarousel.styles';
import type { ImageCarouselProps } from "./ImageCarousel.types";

const ImageCarousel = ({handlePreviousClick, images, currentImageIndex, hasManualNavigation, handleNextClick, radius, className}:ImageCarouselProps) => {
    return (
        <Styled.ImageCarouselWrapper className={className}>
            <Styled.ImageContainer $radius={radius}>
                {handlePreviousClick && <Styled.NavButton className="nav-button left" text={"<"} buttonType={"button"}  onClick={handlePreviousClick}/>}
                {images.map((image , index) => (
                    <Styled.Image 
                        src={image.url} 
                        alt="carousel-images" 
                        className={currentImageIndex === index ? 'block' : 'hidden'}
                        key={image.id}
                    />
                ))}
                {(handleNextClick && hasManualNavigation) && <Styled.NavButton className="nav-button right" text={">"} buttonType={"button"} onClick={handleNextClick} />}
            </Styled.ImageContainer>
        </Styled.ImageCarouselWrapper>
    )
}

export default ImageCarousel;