"use client";
import React, { useState } from "react";
import styled from "styled-components";
import SettingsMenu from "../settingsMenu/SettingsMenu";
import NotificationMenu from "../notificationMenu/NotificationMenu";
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
const LogoSection = styled(Link)`
  display: flex;
  flex-direction: row;
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
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(!isNotificationMenuOpen);
  };

  const toggleSettingsMenu = () => {
    setSettingsMenuOpen(!isSettingsMenuOpen);
  };
  return (
    <>
      <Header>
        <HeaderSecton>
          <LogoSection href="/start">
            <Logo src="logo.svg"></Logo>
            <Name>Submind</Name>
          </LogoSection>
        </HeaderSecton>
        <HeaderSecton>
          <img src="Bell.svg" alt="Icon" onClick={toggleNotificationMenu} />

          <img src="Settings.svg" alt="Icon" onClick={toggleSettingsMenu} />
        </HeaderSecton>
      </Header>
      <SettingsMenu isOpen={isSettingsMenuOpen} />
      <NotificationMenu isOpen={isNotificationMenuOpen} />
    </>
  );
}
