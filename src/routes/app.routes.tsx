import React from "react";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../pages/Dashboard";
import { Register } from "../pages/Register";
import { Resume } from "../pages/Resume";
import theme from "../global/styles/theme";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.orange,
        tabBarInactiveTintColor: theme.colors.title,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.medium,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
