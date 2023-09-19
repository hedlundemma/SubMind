"use client";
import Footer from "@/components/footer/footer";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import styled from "styled-components";
import PrenumationButton from "@/components/subscriptionButton/SubscriptionButton";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubscriptionCard from "@/components/subscriptionCard/SubscriptionCard";

const Main = styled.div`
  background-color: white;
  height: 850px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const Logo = styled.img`
  height: 116px;
  width: 88px;
`;
const InfoSection = styled.section`
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  width: 100%;
  p {
    font-size: 16px;
  }
  h3 {
    font-size: 32px;
    font-weight: 500;
  }
`;
const Section = styled.section`
  height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  div {
    width: 100%;
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-top: 64px;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  margin-bottom: 48px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Start() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState("");
  const [user, setUser] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = supabase.auth.getSession();
      if (session) {
        if ((await session).data.session == null) {
          router.push("/login");
        }
      }
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("Subscriptions")
        .select()
        .eq("user_uuid", user.id);
      setSubscriptions(data);
    };
    fetchSubscriptions();
  }, [user]);
  console.log(subscriptions);

  let cardsComponent = null;

  useEffect(() => {
    // Ensure subscriptions is an array before processing
    if (Array.isArray(subscriptions)) {
      // Initialize a variable to store the total cost
      let calculatedTotalCost = 0;

      // Loop through the subscriptions and calculate the total cost
      subscriptions.forEach((subscription) => {
        calculatedTotalCost += subscription.monthly_cost;
      });

      // Update the state with the calculated total cost
      setTotalCost(calculatedTotalCost);
    }
  }, [subscriptions]);

  if (Array.isArray(subscriptions)) {
    cardsComponent = subscriptions.map((subscription) => (
      <SubscriptionCard
        key={subscription.id}
        cost={subscription.monthly_cost}
        name={subscription.subscription}
      />
    ));
  }

  return (
    <Main>
      <UserNavbar></UserNavbar>
      <InfoSection>
        <p>Totalkostnad för månad:</p>
        <h3>{totalCost} Sek</h3>
      </InfoSection>
      <PrenumationButton
        href="/subscription"
        text="Lägg till prenumation"
      ></PrenumationButton>
      <Section>
        <div>{cardsComponent}</div>
        <Heading>Lägg till en prenumation för att komma igång!</Heading>
        {/* <ImageDiv>
          <Logo src="arrow.svg"></Logo>
        </ImageDiv> */}
        <ButtonDiv></ButtonDiv>
        <button onClick={handleLogout}>Logout</button>
      </Section>
      <Footer></Footer>
    </Main>
  );
}
