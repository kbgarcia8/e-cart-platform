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