import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  text-align: center;
  background-color: #000000;
  color: white;
  width: 340px;
  height: 55px;
  font-family: "K2D";
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  img {
    margin-right: 20px;
  }
`;

const SubscriptionButton = ({ href, text }) => {
  return (
    <Link href={href}>
      <Button className="subscription-button">
        <img src="logo//plus.svg" alt="Plus" /> {text}
      </Button>
    </Link>
  );
};

export default SubscriptionButton;
