import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

interface IconProps {
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 16px;
  background-color: ${({ theme, type, isActive }) =>
    type === "up" && isActive === true
      ? theme.colors.green_light
      : type === "down" && isActive === true
      ? theme.colors.red_light
      : theme.colors.background};
  margin-top: 2px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ type, theme }) =>
    type === "up" ? theme.colors.green : theme.colors.red};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
