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

function Overview() {
  return (
    <Main>
      <UserNavbar></UserNavbar>
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
