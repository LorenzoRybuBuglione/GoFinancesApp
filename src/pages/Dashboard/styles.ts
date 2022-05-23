import styled from 'styled-components/native';
// import { RFValue } from 'react-native-responsive-fontsize';
// import Theme from '../../global/styles/theme';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.title};
`;