import React from "react";
import * as Styled from "./TestimonialCard.styles"
import StarRating from "components/molecules/StarRating";
import type { TestimonialCardProps } from "./TestimonialCard.types";

const starsQuantiy = Array(5).fill(0)

const TestimonialCard = ({
    testimonial,
    ratedColor,
    noRateColor,
    cardRadius,
    cardColor,
    nameColor,
    messageColor,
    className,
    children
}:React.PropsWithChildren<TestimonialCardProps>) => {

    

    return (
        <Styled.TestimonialCardWrapper $cardRadius={cardRadius} $cardColor={cardColor} className={className}>
            <Styled.TestimonialCardInfoContainer>
                <Styled.TestimoneePictureContainer>
                    <Styled.TestimoneePicture src={testimonial.photo} alt={`${testimonial.user}-photo`}/>
                </Styled.TestimoneePictureContainer>
                <Styled.TestimonialCardNameAndRatingContainer>
                    <Styled.TestimonialCardUserName $nameColor={nameColor}>{`${testimonial.user}`}</Styled.TestimonialCardUserName>
                    <Styled.StarRatingContainer>
                        <StarRating
                            stars={starsQuantiy}
                            ratedColor={ratedColor}
                            noRateColor={noRateColor}
                            rating={testimonial.rating}
                            withText={false}
                        />
                    </Styled.StarRatingContainer>
                </Styled.TestimonialCardNameAndRatingContainer>
            </Styled.TestimonialCardInfoContainer>
            <Styled.TestimonialCardMessage $messageColor={messageColor}>{`${testimonial.message}`}</Styled.TestimonialCardMessage>
            {children}
        </Styled.TestimonialCardWrapper>
    )
}

export default TestimonialCard;