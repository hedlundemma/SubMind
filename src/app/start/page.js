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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
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
  width: 100%;
  div {
    width: 100%;
  }
`;

const CardsContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
        id={subscription.id}
        cost={subscription.monthly_cost}
        name={subscription.subscription}
      />
    ));
  }

  if(subscriptions)
  {
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
          <CardsContainer>{cardsComponent}</CardsContainer>
          <ButtonDiv></ButtonDiv>
          <button onClick={handleLogout}>Logout</button>
        </Section>
        <Footer></Footer>
      </Main>
    );
  }
  else
  {
    return(
      <p>Loading...</p>
    )
  }
}
