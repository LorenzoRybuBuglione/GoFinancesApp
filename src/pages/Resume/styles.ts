import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
    flex: 1
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.purple};
  height: ${RFValue(113)}px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  text-transform: capitalize;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
