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
`;

export default function UserNavbar() {
  return (
    <>
      <Header>
        <HeaderSecton>
          <Logo src="logo.svg"></Logo>
          <Name>Submind</Name>
        </HeaderSecton>
        <HeaderSecton></HeaderSecton>
      </Header>
    </>
  );
}
