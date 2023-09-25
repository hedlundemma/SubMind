"use client";
import Footer from "@/components/footer/footer";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import SubscriptionButton from "@/components/subscriptionButton/SubscriptionButton";
import SubscriptionCard from "@/components/subscriptionCard/SubscriptionCard";

const Main = styled.div`
  background-color: white;
  min-height: 100vh;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
`;

const InfoSection = styled.section`
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 48px;
  p {
    font-size: 16px;
  }
  h3 {
    font-size: 32px;
    font-weight: 500;
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
  margin-top: 48px;
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
  const [subscriptions, setSubscriptions] = useState("");
  const [user, setUser] = useState("");
  const [totalCost, setTotalCost] = useState(0);

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
        startDate={subscription.startDate}
        renewalFrequency={subscription.renewalFrequency}
      />
    ));
  }

  if (subscriptions) {
    return (
      <Main>
        <UserNavbar></UserNavbar>
        <OuterDiv>
          <InnerImage src="/logo/Graph.svg" alt="Graph image" />
        </OuterDiv>

        <InfoSection>
          <p>Totalkostnad för månad:</p>
          <h3>{totalCost} Sek</h3>
        </InfoSection>
        <ButtonDiv>
          <SubscriptionButton
            href="/subscription"
            text="Lägg till prenumation"
          ></SubscriptionButton>
        </ButtonDiv>
        <Section>
          <CardsContainer>{cardsComponent}</CardsContainer>
        </Section>
        <Footer></Footer>
      </Main>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default Overview;
