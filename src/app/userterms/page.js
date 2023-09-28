"use client";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";
import styled from "styled-components";

const Main = styled.div`
  background-color: white;
  min-height: 100vh;
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
  }

  p {
    margin-bottom: 10px;
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 12px;
  margin-top: 32px;
  font-family: "K2D";
`;

const ContainerDiv = styled.div`
  padding: 20px;
  margin-bottom: 16px;
  height: 100vh;
`;

const Logo = styled.img`
  width: 15px;
  height: 22px;
  margin-top: 10px;
`;

export default function userTerms() {
  return (
    <Main>
      <Navbar></Navbar>
      <Section>
        <Link href="/register">
          <Logo src="/logo/Left-arrow.svg"></Logo>Gå tillbaka
        </Link>
        <ContainerDiv>
          <Heading>Användarvillkor</Heading>
          <h3> Introduktion</h3>
          <p>
            Denna sekretesspolicy beskriver hur Submind samlar in, använder,
            lagrar och skyddar dina personuppgifter när du använder vår
            prenumerationsspårningstjänst. Vi åtar oss att respektera din
            integritet och följa tillämpliga dataskyddslagar, inklusive den
            allmänna dataskyddsförordningen (GDPR).
          </p>
          <h3> Information vi samlar in:</h3>
          <p>
            Användarkontoinformation: När du skapar ett konto på vår
            prenumerationsspårare samlar vi in ​och lagrar följande information:
            E-postadress och Lösenord
          </p>
          <h3> Hur vi använder dina uppgifter:</h3>
          <p>
            Vi använder din e-postadress och ditt lösenord för att skapa och
            hantera ditt konto, låta dig logga in och ge tillgång till våra
            prenumerationsspårningstjänster.
          </p>
          <h3> Dina rättigheter:</h3>
          <p>
            Du kan begära tillgång till de personuppgifter vi har om dig, gör
            detta genom att kontakta oss på submind@help.com. Radering: Du kan
            begära radering av dina personuppgifter under vissa omständigheter.
          </p>
          <h3>Kontakta oss:</h3>
          <p>
            Om du har några frågor eller funderingar angående denna
            integritetspolicy eller dina personuppgifter, vänligen kontakta oss
            på submind@help.com.
          </p>
        </ContainerDiv>
      </Section>
      <Footer></Footer>
    </Main>
  );
}
