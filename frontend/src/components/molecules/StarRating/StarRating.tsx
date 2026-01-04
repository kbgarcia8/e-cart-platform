import React from "react";
import * as styled from "./StarRating.styles"
import StarIcon from "components/svgs/StarIcon";
import type { StarRatingProps } from "./StarRating.types";


const StarRating = ({
    stars,
    ratedColor,
    noRateColor,
    rating,
    withText,
    className
}:StarRatingProps) => {

    return (
        <styled.StarRatingWrapper className={className}>
            <styled.StarIconsContainer>
            {stars.map((_, index) => {
                const [whole, decimal] = rating.split('.').map(Number);
                if (index < whole) {
                    return <StarIcon key={`${index}`} fill={ratedColor} />;
                } else if (index === whole && decimal >= 5) {
                    return (
                    <StarIcon
                        key={`${index}`}
                        fillColor={ratedColor}
                        blankColor={noRateColor}
                    />
                    );
                } else {
                    return <StarIcon key={`${index}`} fill={noRateColor} />;
                }
            })}
            </styled.StarIconsContainer>
            {withText && <styled.StarRatingText>{`${rating} Stars`}</styled.StarRatingText>}
        </styled.StarRatingWrapper>
    )
}

export default StarRating;