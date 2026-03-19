import styled from 'styled-components';
import { v } from 'shared/constants/variables'
import { Link } from 'react-router-dom';
import { media } from 'shared/utils/utility';

export const UserHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-bottom: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor1};
    background-color: ${({ theme }) => theme.colors.backgroundColor1};
    padding-inline: ${v.spacing.small};
`;