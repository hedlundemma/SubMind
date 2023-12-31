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

  h2 {
    font-family: "K2D";
    font-size: 22px;
    font-weight: 400;
  }
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
    font-family: "K2D";
  
  }
  button {
    box-sizing: border-box;
    width: 358px;
    padding: 8px 0;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 5px;
    height: 40px;
    margin-top: 16px;
    font-family: "K2D";


`;
const UpdateInputField = styled.section`
  input {
    all: unset;
    background-color: #ededed;
    height: 40px;
    margin-bottom: 10px;
  }
  .left {
    border-radius: 10px 0 0 10px;
  }
  .right {
    border-radius: 0 10px 10px 0;
  }
  p {
    justify-self: center;
  }
`;

const Logo = styled.img`
  width: 77px;
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
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
  font-family: "K2D";
`;

const CheckboxInput = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  margin-right: 2px;
`;

const Slug = (id) => {
  const router = useRouter();
  const [subscription, setSubscription] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [updatedSubscription, setUpdatedSubscription] = useState({
    cost: "",
    renewal: "",
  });
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

  //function to update the price of the subscription
  const updateSubscription = async () => {
    const { error } = await supabase
      .from("Subscriptions")
      .update({
        monthly_cost: updatedSubscription.cost,
      })
      .eq("id", subscriptionId);

    if (error) {
      console.error("Error updating subscription:", error);
    } else {
      console.log("Subscription updated successfully");
    }
  };

  //delete a single subscription from your account
  const deleteSubscription = async () => {
    const { error } = await supabase
      .from("Subscriptions")
      .delete()
      .eq("id", subscriptionId);

    if (error) {
      console.error("Error deleting subscription:", error);
    } else {
      router.push("/overview");
    }
  };

  const yearlyCost =
    subscription?.yearly_cost ||
    (subscription?.monthly_cost ? subscription?.monthly_cost * 12 : "N/A");

  if (subscription && subscription.id) {
    return (
      <>
        <UserNavbar></UserNavbar>
        <SubscriptionPage>
          <BackButton href="overview">
            {" "}
            <Logo src="/logo/back.svg"></Logo>
          </BackButton>
          <img src={`logo/${subscription.subscription}.svg`} />
          <MainInfo>
            <h2>{subscription.subscription}</h2>
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
                <p>{yearlyCost} Kr</p>
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
                <input
                  placeholder="Lägg till kostnad"
                  className="left"
                  value={updatedSubscription.cost}
                  onChange={(e) =>
                    setUpdatedSubscription({
                      ...updatedSubscription,
                      cost: e.target.value,
                    })
                  }
                />
              </UpdateInputField>
              <UpdateInputField>
                <p>Förnyas</p>
                <input placeholder="Månadsvis" className="right"></input>
              </UpdateInputField>
            </div>
            <div>
              <CheckboxInput type="checkbox" />
              <p>Gratisperiod?</p>
            </div>
            <Link href="/overview">
              <button onClick={updateSubscription}>Spara ändringar</button>
            </Link>
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
