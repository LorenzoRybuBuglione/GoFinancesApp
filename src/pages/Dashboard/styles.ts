import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import { FlatList, FlatListProps } from "react-native";
import { DataListProps } from ".";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.purple};
  /* align-items: flex-start; */
  justify-content: flex-start;
`;

export const UserContainer = styled.View`
  width: 100%;
  padding: 0px ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight()}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserPhoto = styled.Image`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
  border-radius: ${RFValue(10)}px;
`;

export const UserInfo = styled.View`
  margin-left: ${RFValue(17)}px;
`;

export const UserHello = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ExitIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 16px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const TransactionsCards = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() },
})``;
