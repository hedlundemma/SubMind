"use client";
import Footer from "@/components/footer/footer";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import styled from "styled-components";
import SubscriptionButton from "@/components/subscriptionButton/SubscriptionButton";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
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
  width: 100vw;
  height: 252px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// Styled component for the inner image
const InnerImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
  position: absolute;
  bottom: 0;
`;
const NotificationsComponent = dynamic(
  () => import("@/components/notificationsComponent/NotificationsComponent"),
  {
    ssr: false,
  }
);

function Overview() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState("");
  const [user, setUser] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostPerYear, setTotalCostPerYear] = useState(0);
  const [totalCostPerMonth, setTotalCostPerMonth] = useState(0);

  //if the user is not authenticated, redirect to login
  useEffect(() => {
    const checkUserSession = async () => {
      const session = supabase.auth.getSession();
      if (session) {
        if ((await session).data.session == null) {
          router.push("/login");
        }
      }
    };
    checkUserSession();
  }, [router]);

  //fetch subscriptions from the database from the user
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

  let cardsComponent = null;

  useEffect(() => {
    if (Array.isArray(subscriptions)) {
      let totalMonthlyCost = 0;
      let totalYearlyCost = 0;

      subscriptions.forEach((subscription) => {
        if (subscription.yearly_cost) {
          totalYearlyCost += subscription.yearly_cost;
        } else {
          totalMonthlyCost += subscription.monthly_cost;
        }
      });

      const totalCostPerYear = Math.ceil(totalYearlyCost);
      const totalCostPerMonth = Math.ceil(totalMonthlyCost);

      setTotalCostPerYear(totalCostPerYear);
      setTotalCostPerMonth(totalCostPerMonth);
    }
  }, [subscriptions]);
  if (Array.isArray(subscriptions)) {
    cardsComponent = subscriptions.map((subscription) => (
      <SubscriptionCard
        key={subscription.id}
        id={subscription.id}
        cost={
          subscription.yearly_cost
            ? subscription.yearly_cost
            : subscription.monthly_cost
        }
        name={subscription.subscription}
        renewalFrequency={subscription.yearly_cost ? "year" : "month"}
      />
    ));
  }

  if (subscriptions) {
    return (
      <Main>
        <NotificationsComponent />
        <UserNavbar></UserNavbar>
        <OuterDiv>
          <InnerImage src="/logo/Graph.svg" alt="Graph image" />
        </OuterDiv>

        <InfoSection>
          <p>Totalkostnad för år:</p>
          <h3>{totalCostPerYear} SEK</h3>
          <p>Totalkostnad för månad:</p>
          <h3>{totalCostPerMonth} SEK</h3>
        </InfoSection>
        <ButtonDiv>
          <SubscriptionButton
            href="/subscription"
            text="Lägg till prenumeration"
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
