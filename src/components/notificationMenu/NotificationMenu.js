" use client";
import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: absolute;
  top: 80px;
  background-color: white;
  width: 390px;
  height: 94%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 10px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
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
  // function to close the menu by calling the toggleMenu function
  const closeMenu = () => {
    toggleMenu();
  };
  return (
    <MenuContainer $isOpen={isOpen}>
      <Section>
        <NotificationContainer>
          <Heading> Notifikationer</Heading>
          <CrossButton onClick={closeMenu}>
            <img src="./cross.svg" alt="a cross icon" />
          </CrossButton>
        </NotificationContainer>
      </Section>
    </MenuContainer>
  );
};

export default NotificationMenu;
