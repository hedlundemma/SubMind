import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
const Card = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding-left: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 48px;
  border-bottom: 2px solid gainsboro;
  h3 {
    font-size: 14px;
    font-weight: 400;
  }
`;

const MainText = styled.p`
  font-size: 18px;
  font-weight: 400;
`;
const SubscriptionCard = (props) => {
  const router = useRouter();
  const [renewalDate, setRenewalDate] = useState(null);

  //fetch the renew_date from the database to use to calculate days left of subscription
  useEffect(() => {
    const fetchRenewalDate = async () => {
      try {
        const { data, error } = await supabase
          .from("Subscriptions")
          .select("renew_date")
          .eq("id", props.id)
          .single();

        if (error) {
          console.error("Error fetching renewalDate:", error.message);
        } else {
          setRenewalDate(data.renew_date);
        }
      } catch (error) {
        console.error("Error fetching renewalDate:", error);
      }
    };

    fetchRenewalDate();
  }, [props.id]);

  const handleButtonClick = () => {
    router.push(`${[props.id]}?id=${props.id}`);
    console.log("clicked");
  };

  const displayCost =
    props.renewalFrequency === "year"
      ? props.cost + " Sek/Årligen"
      : props.cost + " Sek/Månad";

  return (
    <Card onClick={handleButtonClick}>
      <div>
        <img src={`./logo/${props.name}.svg`} width="100px" />
      </div>
      <div>
        <h3>Kostnad</h3>
        <MainText>{displayCost}</MainText>
      </div>
      <div>
        <h3>Förnyas om</h3>
        <MainText>{renewalDate}</MainText>
        <p>Dagar</p>
      </div>
    </Card>
  );
};

export default SubscriptionCard;
