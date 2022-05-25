import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type: "up" | "down" | "total";
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.orange : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 22px 42px 22px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(33)}px;
  color: ${({ theme, type }) =>
    type === "up"
      ? theme.colors.green
      : type === "down"
      ? theme.colors.red
      : theme.colors.shape};
`;

export const Content = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text};
`;
