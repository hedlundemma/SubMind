"use client";
import Link from "next/link";
import styled from "styled-components";
const Header = styled.header`
  background-color: white;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 16px;
`;
const HeaderSecton = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
const Logo = styled.img`
  height: 36px;
  width: 36px;
`;
const Name = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: black;
`;

const LoginBtn = styled(Link)`
  font-size: 12px;
  padding: 8px;
  color: black;
  font-family: "K2D";
  font-weight: 500;
`;
const RegisterBtn = styled(Link)`
  font-size: 12px;
  border-radius: 50px;
  background-color: black;
  color: white;
  padding: 12px 16px;
  font-family: "K2D";
  font-weight: 500;
`;

export default function Navbar() {
  return (
    <>
      <Header>
        <HeaderSecton>
          <Logo src="/logo/logo.svg"></Logo>
          <Name>Submind</Name>
        </HeaderSecton>
        <HeaderSecton>
          <LoginBtn href="/login">Logga in</LoginBtn>
          <RegisterBtn href="/register">Registrera dig</RegisterBtn>
        </HeaderSecton>
      </Header>
    </>
  );
}
