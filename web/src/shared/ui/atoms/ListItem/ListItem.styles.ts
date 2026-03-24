import styled from 'styled-components';

export const GenericListItem = styled.li<{ $justifyContent?: string; $flexDirection?: string }>`
    flex-direction: ${props => props.$flexDirection || 'row'};
    justify-content: ${props => props.$justifyContent || 'center'};
    display: flex;
    align-items: center;
    list-style-type: none;
    width: 100%;
`;

export default GenericListItem;