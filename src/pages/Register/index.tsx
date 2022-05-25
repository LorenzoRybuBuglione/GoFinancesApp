import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "../../components/Form/InputForm";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Valor é obrigatório"),
});

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleOpenModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria da transação");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                isActive={transactionType === "up"}
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                type="down"
                title="Saída"
                isActive={transactionType === "down"}
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen} statusBarTranslucent={true}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
