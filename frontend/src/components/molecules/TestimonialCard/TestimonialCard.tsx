import { React, useMemo} from "react";
import useTheme from "hooks/useTheme";
import * as Styled from "./TestimonialCard.styles.js"
import StarRating from "components/molecules/StarRating";

const starsQuantiy = Array(5).fill(0)

const TestimonialCard = ({
    testimonial,
    className,
    children
}) => {

    const {currentTheme} = useTheme();

    const starRatingColors = useMemo(() => {
        return {
            filled: currentTheme.notificationPalette.warning,
            blank: currentTheme.colors.shadow
        }
    }, [currentTheme])

    return (
        <Styled.TestimonialCardWrapper className={className}>
            <Styled.TestimoneePictureContainer>
                <Styled.TestimoneePicture src={testimonial.photo} alt={`${testimonial.name}-photo`}/>
            </Styled.TestimoneePictureContainer>
            <Styled.TestimonialCardUserName>{`${testimonial.user}`}</Styled.TestimonialCardUserName>
            <Styled.StarRatingContainer>
                <StarRating
                    stars={starsQuantiy}
                    ratedColor={starRatingColors.filled}
                    noRateColor={starRatingColors.blank}
                    rating={testimonial.rating}
                    withText={false}
                />
            </Styled.StarRatingContainer>
            <Styled.TestimonialCardMessage>{`${testimonial.message}`}</Styled.TestimonialCardMessage>            
            {children}
        </Styled.TestimonialCardWrapper>
    )
}

export default TestimonialCard;