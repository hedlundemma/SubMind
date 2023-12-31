"use client";
import React, { useState } from "react";
import Link from "next/link";
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
  height: 24px;
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

const BellImage = styled.img`
  width: 22px;
  height: 22px;
`;

const SettingsImage = styled.img`
  width: 26px;
  height: 26px;
`;

export default function UserNavbar() {
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);

  //open up the notification-menu
  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(!isNotificationMenuOpen);
  };

  //open up the settings-menu
  const toggleSettingsMenu = () => {
    setSettingsMenuOpen(!isSettingsMenuOpen);
  };

  return (
    <>
      <Header>
        <HeaderSecton>
          <LogoSection href="/overview">
            <Logo src="/logo/logo.svg"></Logo>
            <Name>Submind</Name>
          </LogoSection>
        </HeaderSecton>
        <HeaderSecton>
          <BellImage
            src="/logo/Bell.svg"
            alt="Icon"
            onClick={toggleNotificationMenu}
          />

          <SettingsImage
            src="/logo/Settings.svg"
            alt="Icon"
            onClick={toggleSettingsMenu}
          />
        </HeaderSecton>
      </Header>
      <SettingsMenu
        isOpen={isSettingsMenuOpen}
        toggleMenu={toggleSettingsMenu}
      />
      <NotificationMenu
        isOpen={isNotificationMenuOpen}
        toggleMenu={toggleNotificationMenu}
      />
    </>
  );
}
