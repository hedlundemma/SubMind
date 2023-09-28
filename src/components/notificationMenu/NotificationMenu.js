"use client"
import React, { useState } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: absolute;
  top: 80px;
  background-color: white;
  width: 100vw;
  height: 94%;
  z-index: 100;
  padding: 10px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ToggleButton = styled.div`
  width: 50px;
  height: 24px;
  background-color: ${(props) =>
    props.toggled === "true" ? "RGBA(0, 133, 29, 0.5)" : "lightgray"};
  border-radius: 12px;
  position: relative;
  transition: background-color 0.3s ease;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #00851d;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.toggled === "true" ? "30px" : "2px")};
  transition: left 0.3s ease, background-color 0.3s ease;
`;

const Section = styled.div`
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 300;
  color: black;
  margin-bottom: 24px;
  margin-top: 24px;
`;

const NotificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CrossButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
`;

const NotificationMenu = ({ isOpen, toggleMenu }) => {
  const [isToggle1Left, setIsToggle1Left] = useState(false);
  const [isToggle2Left, setIsToggle2Left] = useState(false);
  const [isToggle3Left, setIsToggle3Left] = useState(false);

  const closeMenu = () => {
    toggleMenu();
  };

  return (
    <MenuContainer $isOpen={isOpen}>
      <Section>
        <NotificationContainer>
          <Heading> Notifikationer</Heading>
          <CrossButton onClick={closeMenu}>
            <img src="/logo/cross.svg" alt="a cross icon" />
          </CrossButton>
        </NotificationContainer>
      </Section>

      <Container>
        <ToggleContainer>
          <p>Alla notiser</p>
          <ToggleButton
            onClick={() => setIsToggle1Left(!isToggle1Left)}
            toggled={isToggle1Left.toString()} 
          >
            <Circle toggled={isToggle1Left.toString()} />
          </ToggleButton>
        </ToggleContainer>

        <ToggleContainer>
          <p>Notiser via mail</p>
          <ToggleButton
            onClick={() => setIsToggle2Left(!isToggle2Left)}
            toggled={isToggle2Left.toString()} 
          >
            <Circle toggled={isToggle2Left.toString()} />
          </ToggleButton>
        </ToggleContainer>

        <ToggleContainer>
          <p>Notiser i webbläsaren</p>
          <ToggleButton
            onClick={() => setIsToggle3Left(!isToggle3Left)}
            toggled={isToggle3Left.toString()} 
          >
            <Circle toggled={isToggle3Left.toString()} />
          </ToggleButton>
        </ToggleContainer>
      </Container>
    </MenuContainer>
  );
};

export default NotificationMenu;
