"use client";
import Link from "next/link";
import styled from "styled-components";

const FooterSection = styled.footer`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  width: 100%;
  gap: 32px;
  padding: 24px;
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  height: 36px;
  width: 36px;
`;
const Name = styled.h2``;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  justify-content: space-between;
`;

const LowerDiv = styled.div`
  p {
    margin: 0;
  }
`;

export default function Footer() {
  return (
      <FooterSection>
        <LogoDiv>
          <Logo src="logo.svg"></Logo>
          <Name>Submind</Name>
        </LogoDiv>
        <FooterDiv>
          <div>
            <p>Kontakta oss</p>
            <p>FAQ</p>
          </div>
          <div>
            <Link href="./userterms">Användarvillkor</Link>
            <p>Integritetspolicy</p>
          </div>
        </FooterDiv>
        <LowerDiv>
          <p>© Submind 2023.</p>
        </LowerDiv>
      </FooterSection>
  );
}
