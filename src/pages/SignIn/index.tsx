import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";

import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components";

import { useAuth } from "../../hooks/auth";

import { SignInButton } from "../../components/SignInButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const theme = useTheme();

  async function hadleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG
            width={RFValue(120)}
            height={RFValue(68)}
            style={{ alignSelf: "center" }}
          />
          <Title>
            Controle suas{"\n"}
            finanças de forma{"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={hadleSignInWithGoogle}
          />
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size={30}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
