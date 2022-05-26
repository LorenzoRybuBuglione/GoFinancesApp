import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserContainer,
  User,
  UserPhoto,
  UserInfo,
  UserHello,
  UserName,
  LogoutButton,
  ExitIcon,
  HighlightCards,
  Title,
  Transactions,
  TransactionsCards,
  LoadingContainer,
} from "./styles";
import theme from "../../global/styles/theme";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransactionDate: string;
}
interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expansesTotal = 0;

    function getLastTransactionDate(
      collection: DataListProps[],
      type: "positive" | "negative"
    ) {
      const lastTransaction = new Date(
        Math.max.apply(
          Math,
          collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        )
      );

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
        "pt-BR",
        { month: "long" }
      )}`;
    }

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expansesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setData(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );

    const lastTransactionExpenses = getLastTransactionDate(
      transactions,
      "negative"
    );

    const interval = `01 à ${lastTransactionExpenses}`;

    const total = entriesTotal - expansesTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactionDate: `Última entrada dia ${lastTransactionEntries}`,
      },
      expenses: {
        amount: expansesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactionDate: `Última saída dia ${lastTransactionExpenses}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactionDate: interval,
      },
    });
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      //   AsyncStorage.removeItem("@gofinances:transactions");
    }, [])
  );

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.purple} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserContainer>
              <User>
                <UserPhoto
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/55191240?v=4",
                  }}
                ></UserPhoto>
                <UserInfo>
                  <UserHello>Olá,</UserHello>
                  <UserName>Lorenzo</UserName>
                </UserInfo>
              </User>
              <LogoutButton onPress={() => {}}>
                <ExitIcon name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransactionDate}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransactionDate}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransactionDate}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsCards
              data={data}
              keyExtractor={(item: DataListProps) => item.id.toString()}
              renderItem={(item) => <TransactionCard data={item.item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
