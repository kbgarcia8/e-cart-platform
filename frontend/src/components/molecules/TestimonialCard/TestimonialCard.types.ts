import { CARDCOLORS, NAMECOLORS, MESSAGECOLORS, RADIUS } from "./TestimonialCard.styles";

export type TestimonialCardProps = {
    testimonial: {
        user: string;
        photo: string;
        rating: string;
        message: string;
    },
    ratedColor?: string;
    noRateColor?: string;
    cardRadius?: keyof typeof RADIUS;
    cardColor?: keyof typeof CARDCOLORS;
    nameColor?: keyof typeof NAMECOLORS;
    messageColor?: keyof typeof MESSAGECOLORS;
    className?: string;
};