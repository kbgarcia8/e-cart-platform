import React from "react";
import * as Styled from './ImageCarousel.styles';
import type { ImageCarouselProps } from "type/propTypes";

const ImageCarousel = ({headerText, handlePreviousClick, images, currentImageIndex, handleNextClick, className}:ImageCarouselProps) => {
    return (
        <Styled.ImageCarouselWrapper className={className}>
            {headerText && <Styled.CarouselHeaderText>{headerText}</Styled.CarouselHeaderText>}
            <Styled.ImageContainer>
                {handlePreviousClick && <Styled.NavButton className="nav-button left" text={"<"} buttonType={"button"}  onClick={handlePreviousClick}/>}
                {images.map((image , index) => (
                    <Styled.Image 
                        src={image.url} 
                        alt="images" 
                        className={ currentImageIndex === index ? 'block' : 'hidden'}
                        key={image.id} 
                    />
                ))}
                {handleNextClick && <Styled.NavButton className="nav-button right" text={">"} buttonType={"button"} onClick={handleNextClick} />}
            </Styled.ImageContainer>
        </Styled.ImageCarouselWrapper>
    )
}

export default ImageCarousel;