import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Days_One, Stardos_Stencil } from "next/font/google";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: black;
  height: 100vh;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 3px solid #ededed;
  }
  form input {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ededed;
    box-sizing: border-box;
  }
  form button {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 0;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    height: 40px;
  }

  label {
    font-size: 16;
    font-weight: 200;
    width: 100%;
  }
`;

// const SubscrptionBtn = styled(Link)`
//   font-size: 18px;
//   border-radius: 50px;
//   background-color: black;
//   color: white;
//   padding: 12px 16px;
//   text-align: center;
// `;

const StreamingForm = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cost, setCost] = useState("");
  const [renewalFrequency, setRenewalFrequency] = useState("monthly");

  //array containing the options for streaming-services
  const streamingServiceOptions = [
    { value: "", label: "Välj en tjänst" },
    { value: "netflix", label: "Netflix" },
    { value: "disneyPlus", label: "Disney+" },
  ];
  // array containing the options for renewal-frequenxy
  const renewalFrequencyOptions = [
    { value: "monthly", label: "Månadsvis" },
    { value: "yearly", label: "Årligen" },
  ];

  //making sure the user is logged in, otherwise redirect to login-page
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //calculate when the subscription is getting renewed

    const [yearNumber, monthNumber, dayNumber] = startDate.split("-");

    const day = parseInt(dayNumber, 10);
    const month = parseInt(monthNumber, 10);
    const year = parseInt(yearNumber, 10);

    // const startDate = new Date(year, month - 1, day);

    // renewDate.setMonth(renewDate.getMonth() + 1);
    const renewDate = day;

    console.log("Renew day:", renewDate);

    // renewDate.setMonth(renewDate.getMonth() + 1);

    const { error } = await supabase.from("Subscriptions").insert({
      subscription: selectedService,
      monthly_cost: cost,
      start_date: startDate,
      renew_date: renewDate,
      user_uuid: user.id,
    });
  };

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        <label>
          Stremingtjänst
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {/* displaying the values from the array */}
            {streamingServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Datum
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </label>

        <label>
          Kostnad
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </label>

        <label>
          Förnyas
          <select
            value={renewalFrequency}
            onChange={(e) => setRenewalFrequency(e.target.value)}
          >
            {/* displaying the values from the array */}
            {renewalFrequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button href="/overview">Lägg till prenumeration</button>
      </form>
    </Section>
  );
};

export default StreamingForm;
