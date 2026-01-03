import type React from "react";
import type { Theme, dataAttributesType } from "./generalTypes";

export type AllNodeProps<T extends React.ReactNode> = {
    [key: string]: T;
};

export type SVGProps = Record<string, string|number|undefined>;

export type StarRatingProps = {
    stars: Array<number>;
    ratedColor: string;
    noRateColor: string;
    rating: string;
    withText: boolean;
    className?: string;
};

export type StepperProps = {
    stepperState: number|string;
    increment: React.MouseEventHandler<HTMLButtonElement>;
    incrementButtonText: string;
    decrement: React.MouseEventHandler<HTMLButtonElement>;
    decrementButtonText: string;
    dataAttributes: dataAttributesType;
    className?: string;
}

export type TestimonialCardProps = {
    testimonial: {
        user: string;
        photo: string;
        name: string;
        rating: string;
        message: string;
    },
    className?: string;
};

export type SectionProps = {
    title?: string;
    description?: string;
    className?: string;
    id: string;
}

export type ImageCarouselProps = {
    headerText?: string;
    images: {
        id: number;
        url: string;
    }[];
    currentImageIndex: number;
    className?: string;
} & (
    | {hasManualNavigation: true; handlePreviousClick?: React.ReactEventHandler<HTMLButtonElement>; handleNextClick?: React.ReactEventHandler<HTMLButtonElement>}
    | {hasManualNavigation: false; handlePreviousClick?: never; handleNextClick?: React.ReactEventHandler<HTMLButtonElement>}
)