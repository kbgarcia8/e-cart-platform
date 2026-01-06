import React, { type PropsWithChildren } from "react";
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
}:PropsWithChildren<TestimonialCardProps>) => {

    

    return (
        <Styled.TestimonialCardWrapper $cardRadius={cardRadius} $cardColor={cardColor} className={className}>
            <Styled.TestimoneePictureContainer>
                <Styled.TestimoneePicture src={testimonial.photo} alt={`${testimonial.user}-photo`}/>
            </Styled.TestimoneePictureContainer>
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
            <Styled.TestimonialCardMessage $messageColor={messageColor}>{`${testimonial.message}`}</Styled.TestimonialCardMessage>
            {children}
        </Styled.TestimonialCardWrapper>
    )
}

export default TestimonialCard;