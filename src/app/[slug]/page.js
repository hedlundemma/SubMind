"use client";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubscriptionCard from "@/components/subscriptionCard/SubscriptionCard";
import styled from "styled-components";
import Link from "next/link";
import UserNavbar from "@/components/userNavbar/UserNavbar";

const BackButton = styled(Link)``;
const SubscriptionPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
`;
const Info = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 16px;
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const MainInfo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const UpdateInfo = styled.section`
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
const UpdateInputField = styled.section`
  input{
    all:unset;
    background-color: #ededed;
    height: 40px;
    padding-left: 16px;
  }
  .left{
    border-radius: 10px 0 0 10px;
  }
  .right{
    border-radius: 0 10px 10px 0;
  }
`;

const Slug = (id) => {
  const [subscription, setSubscription] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  useEffect(() => {
    const setId = async () => {
      const data = id.params.slug;
      setSubscriptionId(data);
    };
    setId();
  }, [id]);
  useEffect(() => {
    const fetchSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("Subscriptions")
        .select()
        .eq("id", id.params.slug);

      if (data[0] && data[0].start_date) {
        data[0].formatted_start_date = new Date(
          data[0].start_date
        ).toLocaleString("default", {
          month: "short",
          day: "numeric",
        });
      }

      // Calculate the number of weeks ago
      const startDate = new Date(data[0].start_date);
      const currentDate = new Date();
      const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
      const weeksAgo = Math.floor(
        (currentDate - startDate) / millisecondsPerWeek
      );

      data[0].weeksAgo = weeksAgo;

      setSubscription(data[0]);
    };
    fetchSubscription();
  }, [subscriptionId]);
  console.log(subscription);

  if (subscription && subscription.id) {
    return (
      <>
        <UserNavbar></UserNavbar>
        <SubscriptionPage>
          <BackButton href="start">Go back</BackButton>
          <img src="logo/netflix.svg" />
          <MainInfo>
            <h1>{subscription.subscription}</h1>
            <Info>
              <div>
                <p>Start datum:</p>
                <p>
                  {" "}
                  {subscription.formatted_start_date} ({subscription.weeksAgo}{" "}
                  weeks ago)
                </p>
              </div>
              <div>
                <p>Månadskostnad:</p>
                <p>{subscription.monthly_cost} Kr</p>
              </div>
              <div>
                <p>Årlig kostnad:</p>
                <p>{subscription.monthly_cost * 12} Kr</p>
              </div>
            </Info>
            <div>
              <p>Total kostnad:</p>
              <p>{subscription.total_cost} Kr</p>
            </div>
          </MainInfo>
          <UpdateInfo>
            <h2>Ändra prenumerationen</h2>
            <div>
              <UpdateInputField>
                <p>Kostnad</p>
                <input placeholder="Lägg till kostnad" className="left" />
              </UpdateInputField>
              <UpdateInputField>
                <p>Förnyas</p>
                <input placeholder="Månadsvis" className="right" />
              </UpdateInputField>
            </div>
            <div>
              <input type="checkbox" />
              <p>Gratisperiod?</p>
            </div>
            <button>Spara ändringar</button>
          </UpdateInfo>
        </SubscriptionPage>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default Slug;
