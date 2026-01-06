import styled, { css } from "styled-components";
import { v } from "constants/variables";
import Button from "components/atoms/Button";

export const RADIUS = {
    square: css`border-radius: ${v.borderRadius.xsmall};`,
    roundedsquare: css`border-radius: ${v.borderRadius.medium};`,
    squircle: css`border-radius: ${v.borderRadius.large};`,
    pill: css`border-radius: ${v.borderRadius.xlarge};`,
    circle: css`border-radius: ${v.borderRadius.circle};`
};

export const ImageCarouselWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    text-align: center;
`;

export const ImageContainer = styled.div<{$radius?: keyof typeof RADIUS}>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 90%;
    min-width: 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: ${({theme})=>theme.colors.screenColor};
    box-shadow: 0 ${v.spacing.medium} ${v.spacing.large} ${({theme})=>theme.colors.shadow};
    aspect-ratio: 4 / 3;
    ${({$radius}) => RADIUS[$radius || 'square']}
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease, transform 0.5s ease;

    &.hidden {
    display: none;
    }

    &.block {
        display: block;
        animation: fadeIn 0.6s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.98);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
export const NavButton = styled(Button)`
    & .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 10%;
        height: 10%;
        background-color: ${({theme})=>theme.colors.shadow};
        color: ${({theme})=>theme.colors.screenColor};
        border: none;
        border-radius: 50%;
        font-size: ${v.fontSize.medium};
        font-weight: normal;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: background-color 0.3s ease, opacity 0.3s ease;
        padding: 0;
        line-height: 1;
        z-index: 1;
    }

    & .nav-button.left {
        left: 1rem;
    }

    & .nav-button.right {
        right: 1rem;
    }

    & .nav-button:hover {
        background-color: rgba(255, 255, 255, 0.6);
        opacity: 1;
    }
`;