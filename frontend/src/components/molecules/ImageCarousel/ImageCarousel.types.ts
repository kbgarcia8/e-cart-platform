import { RADIUS } from "./ImageCarousel.styles";

export type ImageCarouselProps = {
    images: {
        id: number;
        url: string;
    }[];
    currentImageIndex: number;
    radius?: keyof typeof RADIUS;
    className?: string;
} & (
    | {hasManualNavigation: true; handlePreviousClick?: React.ReactEventHandler<HTMLButtonElement>; handleNextClick?: React.ReactEventHandler<HTMLButtonElement>}
    | {hasManualNavigation: false; handlePreviousClick?: never; handleNextClick?: React.ReactEventHandler<HTMLButtonElement>}
)