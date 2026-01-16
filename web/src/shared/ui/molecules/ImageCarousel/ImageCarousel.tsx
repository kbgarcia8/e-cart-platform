import * as Styled from './ImageCarousel.styles';
import type { ImageCarouselProps } from "./ImageCarousel.types";
import Button from 'shared/ui/atoms/Button';

const ImageCarousel = ({handlePreviousClick, images, currentImageIndex, hasManualNavigation, handleNextClick, radius, className}:ImageCarouselProps) => {
    return (
        <Styled.ImageCarouselWrapper className={className}>
            <Styled.ImageContainer $radius={radius}>
                {(handlePreviousClick && hasManualNavigation) && 
                    <Styled.NavButtonWrapperLeft>
                        <Button className={"nav-button left"} text={"<"} buttonType={"button"}  onClick={handlePreviousClick}/>
                    </Styled.NavButtonWrapperLeft>
                }
                {images.map((image , index) => (
                    <Styled.Image 
                        src={image.url} 
                        alt="carousel-images" 
                        className={currentImageIndex === index ? 'block' : 'hidden'}
                        key={image.id}
                    />
                ))}
                {(handleNextClick && hasManualNavigation) && 
                    <Styled.NavButtonWrapperRight>
                        <Button className={"nav-button right"} text={">"} buttonType={"button"} onClick={handleNextClick} />
                    </Styled.NavButtonWrapperRight>
                }
            </Styled.ImageContainer>
        </Styled.ImageCarouselWrapper>
    )
}

export default ImageCarousel;