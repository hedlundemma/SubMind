"use client";
import Footer from "@/components/footer/footer";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import { supabase } from "../../../supabase";
import styled from "styled-components";
import PrenumationButton from "@/components/subscriptionButton/SubscriptionButton";

const Main = styled.div`
  background-color: white;
  height: 1444px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 1030px;
  padding: 24px;
`;

// Styled component for the outer div with background image
const OuterDiv = styled.div`
  background-image: url("/logo/Rectangle.png");
  background-position: center;
  width: 385px;
  height: 252px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// Styled component for the inner image
const InnerImage = styled.img`
  width: 342px;
  height: 200px;
  object-fit: contain;
  position: absolute;
`;

function Overview() {
  return (
    <Main>
      <UserNavbar></UserNavbar>
      <OuterDiv>
        <InnerImage src="/logo/Graph.svg" alt="Inner Image" />{" "}
      </OuterDiv>
      <Section>
        <PrenumationButton
          href="/subscription"
          text="Lägg till prenumation"
        ></PrenumationButton>
      </Section>
      <Footer></Footer>
    </Main>
  );
}

export default Overview;
