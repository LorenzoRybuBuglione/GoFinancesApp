import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  margin-vertical: 7px;
`;
