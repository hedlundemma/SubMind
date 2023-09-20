import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: green;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 10px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const NotificationMenu = ({ isOpen, toggleMenu }) => {
  return (
    <MenuContainer $isOpen={isOpen}>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </MenuContainer>
  );
};

export default NotificationMenu;
