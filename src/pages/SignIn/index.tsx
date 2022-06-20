import React from "react";

import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";


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
          <SignInButton title="Entrar com Google" svg={GoogleSVG} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
