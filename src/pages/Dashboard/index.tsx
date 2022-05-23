import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";

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
  ExitIcon,
  HighlightCards,
  Title,
  Transactions,
  TransactionsCards,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento ",
      amount: "R$ 1.000,00",
      category: { name: "Casa", icon: "home" },
      date: "13/04/2020",
    },
  ];

  return (
    <Container>
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
          <ExitIcon name="power" />
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
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
    </Container>
  );
}
