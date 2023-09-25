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

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-top: 52px;
  padding-bottom: 24px;
`;

const StreamingForm = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cost, setCost] = useState("");
  const [renewalFrequency, setRenewalFrequency] = useState("monthly");

  //function to calculate renewaldate of subscriptions, yearly or monthly
  const calculateRenewalDate = (startDate, renewalFrequency) => {
    const currentDate = new Date(startDate);
    if (renewalFrequency === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (renewalFrequency === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return currentDate.getDate();
  };

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
  //when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const renewalDate = calculateRenewalDate(startDate, renewalFrequency);

    // const [yearNumber, monthNumber, dayNumber] = startDate.split("-");

    // const day = parseInt(dayNumber, 10);
    // const month = parseInt(monthNumber, 10);
    // const year = parseInt(yearNumber, 10);

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

          {/* <Link href="/overview"> */}
          <button>Lägg till prenumeration</button>
          {/* </Link> */}
        </form>
      </Section>
      <Footer></Footer>
    </Main>
  );
};

export default StreamingForm;
