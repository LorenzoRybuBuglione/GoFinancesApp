import React, { useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "./../../utils/categories";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { HistoryCard } from "./../../components/HistoryCard/index";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadingContainer,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  totalNumber: Number;
  color: string;
  percent: string;
}

export function Resume() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function getData() {
    setLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const totalByCategory: CategoryData[] = [];

    const expenses = responseFormatted.filter(
      (expense: TransactionData) =>
        expense.type === "negative" &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensesTotal = expenses.reduce(
      (accumulator: number, expense: TransactionData) => {
        return accumulator + Number(expense.amount);
      },
      0
    );

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: total,
          totalNumber: categorySum,
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
        getData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      <Content
        showVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange("prev")}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>
          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>
          <MonthSelectButton onPress={() => handleDateChange("next")}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.purple} size="large" />
          </LoadingContainer>
        ) : (
          <>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent"
                y="totalNumber"
                colorScale={totalByCategories.map((category) => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: "bold",
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={100}
              />
            </ChartContainer>
            {totalByCategories.map((item) => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.total}
                color={item.color}
              />
            ))}
          </>
        )}
      </Content>
    </Container>
  );
}
