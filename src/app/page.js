"use client";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";
import styled from "styled-components";

const Main = styled.div`
  background-color: white;
  .img{
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    padding-bottom: 64px;
  }
  .heroOne{
    background-image: url("images/heroOne.png");
    height: 600px;
    display: flex;
    align-items: center;
  }
  .heroTwo{
    background-image: url("images/heroTwo.png");
    height: 440px;
  }
  .heroThree{
    background-image: url("images/heroThree.png");
    height: 440px;
  }
`;
const Section = styled.section`
  color: white;
  height: 256px;
  font-size: 32px;
  padding: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
`;

const InfoText = styled.h2`
  font-size: 32px;
  font-weight: 400;
`;

const RegisterBtn = styled(Link)`
  font-size: 16px;
  border-radius: 8px;
  background-color: white;
  color: black;
  padding: 12px 16px;
  width: 92%;
`;

export default function Home() {
  return (
    <Main>
      <Navbar></Navbar>

      <Section className="heroOne img">
        <InfoText>Ta kontroll över dina prenumerationer med Submind</InfoText>
          <RegisterBtn href="/register">Kom igång! - Det är gratis</RegisterBtn>
      </Section>
      <Section className="heroTwo img">
        <InfoText>Bli påmmind om när dina gratisperioder löper ut!</InfoText>
      </Section>
      <Section className="heroThree img">
        <InfoText>Få en överblick av din totala kostnad</InfoText>
      </Section>
      <Footer></Footer>
    </Main>
  );
}
