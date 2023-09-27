"use client";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import Footer from "@/components/footer/footer";
import { supabase } from "../../../supabase";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Days_One, Stardos_Stencil } from "next/font/google";
import CompanySearch from "@/components/companySearch/companySearch";

const Main = styled.div`
  background-color: white;
  height: 830px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 525px;
  padding: 24px;

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
    color: #818898;
    padding: 10px;
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
    font-size: 14;
    font-weight: 200;
    width: 100%;
  }

  select {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ededed;
    box-sizing: border-box;
    color: #818898;
    padding: 10px;
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-top: 52px;
  padding-bottom: 24px;
`;

const ChooseSection = styled.section`
  display: flex;
  flex-direction: row;
`;

const StreamingForm = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cost, setCost] = useState("");
  const [renewalFrequency, setRenewalFrequency] = useState("monthly");

  //function to calculate renewaldate of subscriptions, yearly or monthly
  const calculateRenewalDate = (startDate, renewalFrequency) => {
    const currentDate = new Date();
    const renewalDate = new Date(startDate);

    if (renewalFrequency === "monthly") {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else if (renewalFrequency === "yearly") {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    // Calculate the difference in milliseconds between the renewal date and the current date
    const timeDifference = renewalDate - currentDate;

    // Calculate the number of days left until renewal
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft;
  };

  const handleButtonClick = () => {
    router.push("/overview");
  };

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
  //when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const renewalDate = calculateRenewalDate(startDate, renewalFrequency);

    console.log("Renew day:", renewalDate);

    const { error } = await supabase.from("Subscriptions").insert({
      subscription: selectedService,
      monthly_cost: cost,
      start_date: startDate,
      renew_date: renewalDate,
      user_uuid: user.id,
    });
  };
  return (
    <Main>
      <UserNavbar></UserNavbar>
      <Section>
        <Heading>Lägg till prenumeration</Heading>
        <CompanySearch setService={setSelectedService}></CompanySearch>
        <form onSubmit={handleSubmit}>
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
          <ChooseSection>
            <label>
              Kostnad
              <input
                type="text"
                placeholder="Lägg till en kostnad"
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
          </ChooseSection>

          <button onClick={handleButtonClick}>Lägg till prenumeration</button>
        </form>
      </Section>
      <Footer></Footer>
    </Main>
  );
};

export default StreamingForm;
