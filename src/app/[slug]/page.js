"use client";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubscriptionCard from "@/components/subscriptionCard/SubscriptionCard";
import styled from "styled-components";
import Link from "next/link";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import Footer from "@/components/footer/footer";

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
  h2 {
    font-weight: 400;
    margin-bottom: 16px;
    margin-top: 64px;
  
  }
  button {
    box-sizing: border-box;
    width: 358px;
    padding: 8px 0;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    height: 40px;
    margin-top: 16px;
`;
const UpdateInputField = styled.section`
  input {
    all: unset;
    background-color: #ededed;
    height: 40px;
    padding-left: 16px;
  }
  .left {
    border-radius: 10px 0 0 10px;
  }
  .right {
    border-radius: 0 10px 10px 0;
  }
`;

const Logo = styled.img`
  width: 15px;
  height: 22px;
  margin-top: 10px;
`;

const DeleteServiceButton = styled.button`
  box-sizing: border-box;
  width: 348px;
  padding: 8px 0;
  color: black;
  text-align: center;
  border-radius: 6px;
  height: 40px;
  background-color: white;
  border: 1px solid red;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
`;

const Slug = (id) => {
  const router = useRouter();
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

  //delete a single subscription from your account
  const deleteSubscription = async () => {
    try {
      await supabase.from("Subscriptions").delete().eq("id", subscriptionId);

      router.push("/overview");
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  if (subscription && subscription.id) {
    return (
      <>
        <UserNavbar></UserNavbar>
        <SubscriptionPage>
          <BackButton href="overview">
            {" "}
            <Logo src="/logo/Left-arrow.svg"></Logo>Gå tillbaka
          </BackButton>
          <img src={`logo/${subscription.subscription}.svg`} />
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

          <Link href="/overview">
            <DeleteServiceButton onClick={deleteSubscription}>
              Ta bort prenumeration
            </DeleteServiceButton>
          </Link>
          <p>
            Notera: Din prenumeration är fortfarande aktiv på tjänsten även om
            du tar bort den i den här appen!
          </p>
        </SubscriptionPage>
        <Footer></Footer>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default Slug;
